import React, { useCallback, useContext } from 'react';
import { NextPage, GetStaticProps, GetStaticPaths } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import classNames from 'classnames';
import style from './[offset].module.scss';

import DevCMS from '../../../../api/DevCMS';
import Blog from '../../../../../models/Blog';
import ArrayList from '../../../../../models/Array';
import Blogs from '../../../../../components/shared/Blogs';
import BlogsQuery from '../../../../../models/BlogsQuery';
import BlogSideContents from '../../../../../components/shared/BlogSideContents';
import Category from '../../../../../models/Category';
import SearchContext from '../../../../../context/searchContext';

interface Props {
  blogs: ArrayList<Blog>;
  targetCategory: Category;
  categories: ArrayList<Category>;
}

const CategoryBlogsPage: NextPage<Props> = (props: Props) => {
  const { blogs, targetCategory, categories } = props;
  const defaultTitle = 'JI23-DEV';
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
    <>
      <Head>
        <title>{`${targetCategory.name} | ${defaultTitle}`}</title>
        <meta
          property="og:title"
          content={`${targetCategory.name} | ${defaultTitle}`}
        />
        <meta
          name="twitter:title"
          content={`${targetCategory.name}  | ${defaultTitle}`}
        />
      </Head>
      <div className="padding-block border-bottom">
        <div className={style.tagNameWrapper}>
          <h1>{targetCategory.name}</h1>
        </div>
        <div className={classNames(style.blogsContainer, 'container')}>
          <main className={style.mainWrapper}>
            <Blogs blogs={blogs} showPagination category={targetCategory} />
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
    </>
  );
};

const createPath = (
  categories: ArrayList<Category>,
  blogs: ArrayList<Blog>[],
) => {
  return categories.contents.reduce(
    (paths: string[], category: Category, i: number) => {
      const nextPaths = [
        ...Array(Math.ceil(blogs[i].totalCount / blogs[i].limit)),
      ]
        .map((_, i2) => i2 + 1)
        .map(
          (offset) => `/blogs/categories/${category.id ?? ''}/page/${offset}`,
        );

      return [...paths, ...nextPaths];
    },
    [],
  );
};

const getPaths = async (categories: ArrayList<Category>) => {
  const devCMS = new DevCMS();
  const res: Promise<ArrayList<Blog>>[] = [];
  categories.contents.forEach((category) => {
    const query: BlogsQuery = {
      categoryId: category.id,
      limit: '10',
      offset: '0',
    };
    const blogs = devCMS.getBlogs(query);
    res.push(blogs);
  });

  return createPath(categories, await Promise.all(res));
};

export const getStaticPaths: GetStaticPaths = async () => {
  const devCMS = new DevCMS();
  const categories = await devCMS.getCategories();
  const paths = await getPaths(categories);

  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async ({
  params,
}): Promise<{
  props: Props;
}> => {
  const devCMS = new DevCMS();
  const categoryId = params?.id?.toString() ?? '';
  const offset = params?.offset ? String(params?.offset) : '0';
  const query: BlogsQuery = {
    categoryId,
    offset: String((Number.parseInt(offset, 10) - 1) * 3),
    limit: '10',
  };
  const blogs = await devCMS.getBlogs(query);
  const categories = await devCMS.getCategories();
  const targetCategory = await devCMS.getCategory(categoryId);

  return {
    props: {
      blogs,
      targetCategory,
      categories,
    },
  };
};

export default CategoryBlogsPage;
