import classnames from 'classnames';
import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import React from 'react';
import { DevCMS } from '../../../clients';
import { Blogs } from '../../../components/domain/blog/Blogs';
import { BlogSideContents } from '../../../components/domain/blog/BlogSideContents';
import { Blog, BlogsQuery, Category, List } from '../../../models';
import style from './[offset].module.scss';

interface Props {
  blogs: List<Blog>;
  categories: List<Category>;
}

const BlogsPage: NextPage<Props> = (props: Props) => {
  const { blogs, categories } = props;

  return (
    <div
      className={classnames(
        style.blogsContainer,
        'container',
        'padding-block',
        'border-bottom',
      )}
    >
      <main className={style.mainWrapper}>
        <Blogs blogs={blogs} showPagination />
      </main>
      <div className={style.sideWrapper}>
        <BlogSideContents categories={categories} />
      </div>
    </div>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const query: BlogsQuery = { offset: '0', limit: '10' };

  const devCMS = new DevCMS();
  const blogs = await devCMS.getBlogs(query);

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
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
  const num = Number.parseInt(offset, 10);
  const query: BlogsQuery = {
    offset: String((num - 1) * 10),
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
