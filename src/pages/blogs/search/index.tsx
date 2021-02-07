import React, { useEffect, useState } from 'react';
import { NextPage, GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import { CircularProgress } from '@material-ui/core';
import { isEmpty } from 'lodash';
import classNames from 'classnames';
import style from './index.module.scss';

import DevCMS from '../../api/DevCMS';
import Blog from '../../../models/Blog';
import ArrayList from '../../../models/Array';
import Blogs from '../../../components/shared/Blogs';
import fetchWrapper from '../../../utils/FetchUtils';
import BlogsQuery from '../../../models/BlogsQuery';
import useLoading from '../../../hooks/useLoading';
import BlogSideContents from '../../../components/shared/BlogSideContents';
import Category from '../../../models/Category';

interface Props {
  categories: ArrayList<Category>;
}

const BlogsSearchPage: NextPage<Props> = (props: Props) => {
  const { categories } = props;
  const [blogsQuery, setBlogsQuery] = useState<BlogsQuery | null>(null);

  const [blogs, setBlogs] = useState<ArrayList<Blog> | null>(null);
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
          const res = await fetchWrapper.post<ArrayList<Blog>>(
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
        <div className="padding-block border-bottom">
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
          <CircularProgress color="secondary" size={60} />
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
