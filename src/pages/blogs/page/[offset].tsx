import React, { useCallback, useContext } from 'react';
import { NextPage, GetStaticProps, GetStaticPaths } from 'next';
import { useRouter } from 'next/router';
import style from './[offset].module.scss';

import DevCMS from '../../api/DevCMS';
import Blog from '../../../models/Blog';
import ArrayList from '../../../models/Array';
import Blogs from '../../../components/shared/Blogs';
import BlogSideContents from '../../../components/shared/BlogSideContents';
import BlogsQuery from '../../../models/BlogsQuery';
import Category from '../../../models/Category';

import SearchContext from '../../../context/searchContext';

interface Props {
  blogs: ArrayList<Blog>;
  categories: ArrayList<Category>;
}

const BlogsPage: NextPage<Props> = (props: Props) => {
  const { blogs, categories } = props;
  const { search, setSearch } = useContext(SearchContext);
  const router = useRouter();

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

  return (
    <div
      className={`${String(
        style.blogsContainer,
      )} container padding-block border-bottom`}
    >
      <main className={style.mainWrapper}>
        <Blogs blogs={blogs} showPagination />
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
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const query: BlogsQuery = { offset: '0', limit: '10' };

  const devCMS = new DevCMS();
  const blogs = await devCMS.getBlogs(query);

  const paths = [...Array(Math.ceil(blogs.totalCount / blogs.limit))]
    .map((_, i) => i + 1)
    .map((offset) => `/blogs/page/${offset}`);

  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async ({
  params,
}): Promise<{
  props: Props;
}> => {
  const offset = params?.offset ? String(params?.offset) : '0';
  const query: BlogsQuery = {
    offset: String(Math.ceil(Number.parseInt(offset, 10) - 1) * 3),
    limit: '10',
  };
  const devCMS = new DevCMS();
  const blogs = await devCMS.getBlogs(query);
  const categories = await devCMS.getCategories();

  return {
    props: {
      blogs,
      categories,
    },
  };
};

export default BlogsPage;
