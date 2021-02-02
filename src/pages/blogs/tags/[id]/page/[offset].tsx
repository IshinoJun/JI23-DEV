import React, { useCallback, useContext } from 'react';
import { NextPage, GetStaticProps, GetStaticPaths } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import style from './[offset].module.scss';

import DevCMS from '../../../../api/DevCMS';
import Blog from '../../../../../models/Blog';
import ArrayList from '../../../../../models/Array';
import Blogs from '../../../../../components/shared/Blogs';
import Tag from '../../../../../models/Tag';
import BlogsQuery from '../../../../../models/BlogsQuery';
import BlogSideContents from '../../../../../components/shared/BlogSideContents';
import Category from '../../../../../models/Category';

import SearchContext from '../../../../../context/searchContext';

interface Props {
  blogs: ArrayList<Blog>;
  targetTag: Tag;
  categories: ArrayList<Category>;
}

const TagBlogsPage: NextPage<Props> = (props: Props) => {
  const { blogs, targetTag, categories } = props;
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
        <title>{`${targetTag.name} | ${defaultTitle}`}</title>
        <meta
          property="og:title"
          content={`${targetTag.name} | ${defaultTitle}`}
        />
        <meta
          name="twitter:title"
          content={`${targetTag.name}  | ${defaultTitle}`}
        />
      </Head>
      <div className="padding-block border-bottom">
        <div className={style.tagNameWrapper}>
          <h1>{targetTag.name}</h1>
        </div>
        <div className={`${String(style.blogsContainer)} container`}>
          <main className={style.mainWrapper}>
            <Blogs blogs={blogs} showPagination tag={targetTag} />
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

const createPath = (tags: ArrayList<Tag>, blogs: ArrayList<Blog>[]) => {
  return tags.contents.reduce((paths: string[], tag: Tag, i: number) => {
    const nextPaths = [
      ...Array(Math.ceil(blogs[i].totalCount / blogs[i].limit)),
    ]
      .map((_, i2) => i2 + 1)
      .map((offset) => `/blogs/tags/${tag.id ?? ''}/page/${offset}`);

    return [...paths, ...nextPaths];
  }, []);
};

const getPaths = async (tags: ArrayList<Tag>) => {
  const devCMS = new DevCMS();
  const res: Promise<ArrayList<Blog>>[] = [];
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
  const query: BlogsQuery = {
    tagId,
    offset: String((Number.parseInt(offset, 10) - 1) * 3),
    limit: '3',
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
