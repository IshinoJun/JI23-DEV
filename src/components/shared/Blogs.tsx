import Link from 'next/link';
import Image from 'next/image';
import * as React from 'react';
import { Button } from '@material-ui/core';
import { Pagination } from '@material-ui/lab';
import { useRouter } from 'next/router';
import { useCallback } from 'react';
import ArrayList from '../../models/Array';
import Blog from '../../models/Blog';
import style from './Blogs.module.scss';
import Tags from './Tags';
import BlogDate from './BlogDate';
import BlogBreadcrumbs from './BlogBreadcrumbs';
import Category from '../../models/Category';
import Tag from '../../models/Tag';
import BlogCategory from './BlogCategory';

interface Props {
  blogs: ArrayList<Blog>;
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
      <BlogBreadcrumbs tag={tag} category={category} keyword={keyword} />
      {blogs.contents.map(
        (blog) =>
          blog.id && (
            <div key={blog.id} className={style.content}>
              <div className={style.blog}>
                <Link href="/blogs/[id]" as={`/blogs/${blog.id}`}>
                  <a>
                    <Image
                      src={`/ogp/${blog.id}.png`}
                      alt="ブログ画像"
                      width={900}
                      height={472.5}
                    />
                  </a>
                </Link>
                <BlogDate blog={blog} />
                <Link href="/blogs/[id]" as={`/blogs/${blog.id}`}>
                  <a>
                    <h2>{blog.title}</h2>
                  </a>
                </Link>
                <BlogCategory category={blog.category} />
                <Tags tags={blog.tags} tagsPosition="left" />
                <Button
                  style={{ marginTop: 20 }}
                  type="button"
                  variant="contained"
                  className={style.read}
                  aria-label="記事を読む"
                >
                  <Link href="/blogs/[id]" as={`/blogs/${blog.id}`}>
                    <a>記事を読む</a>
                  </Link>
                </Button>
              </div>
            </div>
          ),
      )}
      {showPagination && (
        <div className={style.paginationWrapper}>
          <Pagination
            count={Math.ceil(blogs.totalCount / blogs.limit)}
            variant="outlined"
            shape="rounded"
            color="secondary"
            page={offset}
            onChange={handleChangePage}
          />
        </div>
      )}
    </>
  );
};

export default Blogs;
