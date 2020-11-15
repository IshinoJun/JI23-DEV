import React, { useEffect, useState } from 'react';
import { NextPage, GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import { CircularProgress } from '@material-ui/core';
import { isEmpty } from 'lodash';
import style from './index.module.scss';

import DevCMS from '../../api/DevCMS';
import Blog from '../../../models/Blog';
import ArrayList from '../../../models/Array';
import Tag from '../../../models/Tag';
import Blogs from '../../../components/shared/Blogs';
import BlogTagList from '../../../components/shared/BlogTagList';
import SearchInput from '../../../components/shared/SearchInput';
import fetchWrapper from '../../../utils/FetchUtils';
import BlogsQuery from '../../../models/BlogsQuery';
import useLoading from '../../../hooks/useLoading';

interface Props {
  tags: ArrayList<Tag>;
}

const BlogsSearchPage: NextPage<Props> = (props: Props) => {
  const { tags } = props;
  const [blogsQuery, setBlogsQuery] = useState<BlogsQuery | null>(null);
  const [keyword, setKeyword] = useState<string>('');
  const [blogs, setBlogs] = useState<ArrayList<Blog> | null>(null);
  const router = useRouter();
  const { isLoading, doHidden, doLoading } = useLoading(false);

  const handleClickSearchButton = () => {
    void router.push(`/blogs/search/?keyword=${keyword}`);
  };

  const handleKeyDownSearch = (
    e: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    if (e.key === 'Enter') {
      void router.push(`/blogs/search/?keyword=${keyword}`);
    }
  };

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
    <section className="padding-block border-bottom">
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
        <div className={style.mainWrapper}>
          {!isLoading ? (
            blogs && blogs.contents.length ? (
              <Blogs blogs={blogs} />
            ) : (
              '投稿がありません'
            )
          ) : (
            <CircularProgress />
          )}
        </div>
        <div className={style.sideWrapper}>
          <div className={style.searchInputWrapper}>
            <SearchInput
              keyword={keyword}
              setKeyword={setKeyword}
              onClickSearchButton={handleClickSearchButton}
              onKeyDownSearch={handleKeyDownSearch}
            />
          </div>
          <BlogTagList tags={tags} />
        </div>
      </div>
    </section>
  );
};

export const getStaticProps: GetStaticProps = async (): Promise<{
  props: Props;
}> => {
  const devCMS = new DevCMS();
  const tags = await devCMS.getTags();

  return {
    props: {
      tags,
    },
  };
};

export default BlogsSearchPage;
