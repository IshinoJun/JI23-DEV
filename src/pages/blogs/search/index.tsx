import { CircularProgress } from '@material-ui/core';
import classNames from 'classnames';
import { isEmpty } from 'lodash';
import { GetStaticProps, NextPage } from 'next';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { DevCMS } from '../../../clients';
import { Blogs } from '../../../components/domain/blog/Blogs';
import { BlogSideContents } from '../../../components/domain/blog/BlogSideContents';
import { useLoading } from '../../../hooks';
import { Blog, BlogsQuery, Category, List } from '../../../models';
import fetchWrapper from '../../../utils/FetchUtils';
import style from './index.module.scss';

interface Props {
  categories: List<Category>;
}

const BlogsSearchPage: NextPage<Props> = (props: Props) => {
  const { categories } = props;
  const [blogsQuery, setBlogsQuery] = useState<BlogsQuery | null>(null);

  const [blogs, setBlogs] = useState<List<Blog> | null>(null);
  const router = useRouter();
  const { isLoading, doHidden, doLoading } = useLoading(false);

  useEffect(() => {
    const urlQuery = router.query as BlogsQuery;

    if (!isEmpty(urlQuery)) setBlogsQuery(urlQuery);
  }, [router.query]);

  useEffect(() => {
    if (blogsQuery) {
      doLoading();
      void (async (): Promise<void> => {
        try {
          const res = await fetchWrapper.post<List<Blog>>(
            `/api/blogs`,
            blogsQuery,
          );
          setBlogs(res);
        } catch {
          return;
        } finally {
          doHidden();
        }
      })();
    }
  }, [blogsQuery, doLoading, doHidden]);

  return (
    <>
      {!isLoading ? (
        <div className='padding-block border-bottom'>
          <div className={style.searchContainer}>
            <h1>{blogsQuery?.keyword ?? ''} の検索結果</h1>
          </div>
          <div className={classNames(style.blogsContainer, 'container')}>
            <main className={style.mainWrapper}>
              {blogs && blogs.contents.length ? (
                <Blogs blogs={blogs} keyword={blogsQuery?.keyword} />
              ) : (
                '投稿がありません'
              )}
            </main>
            <div className={style.sideWrapper}>
              <BlogSideContents categories={categories} />
            </div>
          </div>
        </div>
      ) : (
        <div
          className={classNames(style.wrap, 'padding-block', 'border-bottom')}
        >
          <CircularProgress color='secondary' size={60} />
        </div>
      )}
    </>
  );
};

export const getStaticProps: GetStaticProps = async (): Promise<{
  props: Props;
}> => {
  const devCMS = new DevCMS();
  const categories = await devCMS.getCategories();

  return {
    props: {
      categories,
    },
  };
};

export default BlogsSearchPage;
