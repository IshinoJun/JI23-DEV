/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import classNames from 'classnames';
import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import Head from 'next/head';
import React from 'react';
import { DevCMS } from '../../../../../clients';
import Blogs from '../../../../../components/shared/Blogs';
import BlogSideContents from '../../../../../components/shared/BlogSideContents';
import { Blog, BlogsQuery, Category, List, Tag } from '../../../../../models';
import style from './[offset].module.scss';

interface Props {
  blogs: List<Blog>;
  targetTag: Tag;
  categories: List<Category>;
}

const TagBlogsPage: NextPage<Props> = (props: Props) => {
  const { blogs, targetTag, categories } = props;
  const defaultTitle = 'JI23-DEV';

  return (
    <>
      <Head>
        <title>{`${targetTag.name} | ${defaultTitle}`}</title>
        <meta
          property='og:title'
          content={`${targetTag.name} | ${defaultTitle}`}
        />
        <meta
          name='twitter:title'
          content={`${targetTag.name}  | ${defaultTitle}`}
        />
      </Head>
      <div className='padding-block border-bottom'>
        <div className={style.tagNameWrapper}>
          <h1>{targetTag.name}</h1>
        </div>
        <div className={classNames(style.blogsContainer, 'container')}>
          <main className={style.mainWrapper}>
            <Blogs blogs={blogs} showPagination tag={targetTag} />
          </main>
          <div className={style.sideWrapper}>
            <BlogSideContents categories={categories} />
          </div>
        </div>
      </div>
    </>
  );
};

const createPath = (tags: List<Tag>, blogs: List<Blog>[]): string[] => {
  return tags.contents.reduce((paths: string[], tag: Tag, i: number) => {
    const nextPaths = [
      ...Array(Math.ceil(blogs[i].totalCount / blogs[i].limit)),
    ]
      .map((_, i2) => i2 + 1)
      .map((offset) => `/blogs/tags/${tag.id ?? ''}/page/${offset}`);

    return [...paths, ...nextPaths];
  }, []);
};

const getPaths = async (tags: List<Tag>): Promise<string[]> => {
  const devCMS = new DevCMS();
  const res: Promise<List<Blog>>[] = [];
  tags.contents.forEach((tag) => {
    const query: BlogsQuery = { tagId: tag.id, limit: '3', offset: '0' };
    const blogs = devCMS.getBlogs(query);
    res.push(blogs);
  });

  return createPath(tags, await Promise.all(res));
};

export const getStaticPaths: GetStaticPaths = async () => {
  const devCMS = new DevCMS();
  const tags = await devCMS.getTags();
  const paths = await getPaths(tags);

  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async ({
  params,
}): Promise<{
  props: Props;
}> => {
  const devCMS = new DevCMS();
  const tagId = params?.id?.toString() ?? '';
  const offset = params?.offset ? String(params?.offset) : '0';
  const num = Number.parseInt(offset, 10);

  const query: BlogsQuery = {
    tagId,
    offset: String((num - 1) * 10),
    limit: '10',
  };
  const blogs = await devCMS.getBlogs(query);
  const categories = await devCMS.getCategories();
  const targetTag = await devCMS.getTag(tagId);

  return {
    props: {
      blogs,
      targetTag,
      categories,
    },
  };
};

export default TagBlogsPage;
