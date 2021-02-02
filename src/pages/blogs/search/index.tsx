import React, { useCallback, useEffect, useState, useContext } from 'react';
import { NextPage, GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import { CircularProgress } from '@material-ui/core';
import { isEmpty } from 'lodash';
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

import SearchContext from '../../../context/searchContext';

interface Props {
  categories: ArrayList<Category>;
}

const BlogsSearchPage: NextPage<Props> = (props: Props) => {
  const { categories } = props;
  const [blogsQuery, setBlogsQuery] = useState<BlogsQuery | null>(null);

  const { search, setSearch } = useContext(SearchContext);
  const [blogs, setBlogs] = useState<ArrayList<Blog> | null>(null);
  const router = useRouter();
  const { isLoading, doHidden, doLoading } = useLoading(false);

  const handleClickSearchButton = useCallback(() => {
    void router.push(`/blogs/search/?keyword=${search}`);
  }, [search, router]);

  const handleKeyDownSearch = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      if (e.key === 'Enter') {
        void router.push(`/blogs/search/?keyword=${search}`);
      }
    },
    [search, router],
  );

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
    <div className="padding-block border-bottom">
      <div className={style.searchContainer}>
        <h1>
          {!isLoading ? (
            `${blogsQuery?.keyword ?? ''} の検索結果`
          ) : (
            <CircularProgress />
          )}
        </h1>
      </div>
      <div className={`${String(style.blogsContainer)} container`}>
        <main className={style.mainWrapper}>
          {!isLoading ? (
            blogs && blogs.contents.length ? (
              <Blogs blogs={blogs} keyword={blogsQuery?.keyword} />
            ) : (
              '投稿がありません'
            )
          ) : (
            <CircularProgress />
          )}
        </main>
        <div className={style.sideWrapper}>
          <BlogSideContents
            keyword={search}
            categories={categories}
            onClickSearchButton={handleClickSearchButton}
            onKeyDownSearch={handleKeyDownSearch}
            setKeyword={setSearch}
          />
        </div>
      </div>
    </div>
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
