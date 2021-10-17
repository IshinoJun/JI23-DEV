import { Pagination } from '@material-ui/lab';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import * as React from 'react';
import { useCallback } from 'react';
import { Blog, Category, List, Tag } from '../../models';
import { pagesPath } from '../../utils/$path';
import BlogBreadcrumbs from './BlogBreadcrumbs';
import BlogCategory from './BlogCategory';
import BlogDate from './BlogDate';
import style from './Blogs.module.scss';
import Tags from './Tags';

interface Props {
  blogs: List<Blog>;
  showPagination?: boolean;
  tag?: Tag;
  category?: Category;
  keyword?: string;
}

const Blogs: React.FC<Props> = (props: Props) => {
  const { blogs, showPagination, category, tag, keyword } = props;
  const router = useRouter();
  const offset = router.query.offset
    ? Number.parseInt(String(router.query.offset), 10)
    : 1;

  const handleChangePage = useCallback(
    (_: React.ChangeEvent<unknown>, page: number) => {
      const id = router.query.id ? String(router.query.id) : null;
      const path = router.asPath;
      if (id) {
        if (path.includes('tags')) {
          void router.push(`/blogs/tags/${id}/page/${page}`);
        } else if (path.includes('categories')) {
          void router.push(`/blogs/categories/${id}/page/${page}`);
        }
      } else {
        void router.push(`/blogs/page/${page}`);
      }
    },
    [router],
  );

  return (
    <>
      {blogs.contents.map(
        (blog) =>
          blog.id && (
            <div key={blog.id} className={style.warp}>
              <Link href={pagesPath.blogs._id(blog.id).$url()}>
                <a className={style.card}>
                  <div className={style.icon}>
                    <Image
                      src={blog.blogImage.url}
                      alt='ブログ画像'
                      width={70}
                      height={70}
                    />
                  </div>
                  <div className={style.content}>
                    <h2>{blog.title}</h2>
                    <div className={style.contentWarp}>
                      <BlogDate blog={blog} />
                    </div>
                    <BlogCategory category={blog.category} />
                    <Tags tags={blog.tags} tagsPosition='left' />
                  </div>
                </a>
              </Link>
            </div>
          ),
      )}
      {showPagination && (
        <div className={style.paginationWrapper}>
          <Pagination
            count={Math.ceil(blogs.totalCount / blogs.limit)}
            variant='outlined'
            shape='rounded'
            color='secondary'
            page={offset}
            onChange={handleChangePage}
          />
        </div>
      )}
      <div className={style.breadcrumbsWrapper}>
        <BlogBreadcrumbs tag={tag} category={category} keyword={keyword} />
      </div>
    </>
  );
};

export default Blogs;
