/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import classNames from 'classnames';
import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import Head from 'next/head';
import React from 'react';
import { DevCMS } from '../../../../../clients';
import { Blogs } from '../../../../../components/domain/blog/Blogs';
import { BlogSideContents } from '../../../../../components/domain/blog/BlogSideContents';
import { Blog, BlogsQuery, Category, List } from '../../../../../models';
import style from './[offset].module.scss';

interface Props {
  blogs: List<Blog>;
  targetCategory: Category;
  categories: List<Category>;
}

const CategoryBlogsPage: NextPage<Props> = (props: Props) => {
  const { blogs, targetCategory, categories } = props;
  const defaultTitle = 'JI23-DEV';

  return (
    <>
      <Head>
        <title>{`${targetCategory.name} | ${defaultTitle}`}</title>
        <meta
          property='og:title'
          content={`${targetCategory.name} | ${defaultTitle}`}
        />
        <meta
          name='twitter:title'
          content={`${targetCategory.name}  | ${defaultTitle}`}
        />
      </Head>
      <div className='padding-block border-bottom'>
        <div className={style.tagNameWrapper}>
          <h1>{targetCategory.name}</h1>
        </div>
        <div className={classNames(style.blogsContainer, 'container')}>
          <main className={style.mainWrapper}>
            <Blogs blogs={blogs} showPagination category={targetCategory} />
          </main>
          <div className={style.sideWrapper}>
            <BlogSideContents categories={categories} />
          </div>
        </div>
      </div>
    </>
  );
};

const createPath = (
  categories: List<Category>,
  blogs: List<Blog>[],
): string[] => {
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

const getPaths = async (categories: List<Category>): Promise<string[]> => {
  const devCMS = new DevCMS();
  const res: Promise<List<Blog>>[] = [];
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
  const num = Number.parseInt(offset, 10);

  const query: BlogsQuery = {
    categoryId,
    offset: String((num - 1) * 10),
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
