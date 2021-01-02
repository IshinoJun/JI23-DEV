import React, { useCallback, useState } from 'react';
import { NextPage, GetStaticProps, GetStaticPaths } from 'next';
import { useRouter } from 'next/router';
import { compact } from 'lodash';
import style from './[offset].module.scss';

import DevCMS from '../../api/DevCMS';
import Blog from '../../../models/Blog';
import ArrayList from '../../../models/Array';
import Tag from '../../../models/Tag';
import Blogs from '../../../components/shared/Blogs';
import BlogSideContents from '../../../components/shared/BlogSideContents';
import BlogsQuery from '../../../models/BlogsQuery';
import Category from '../../../models/Category';
import { getTopArticlePaths } from '../../../utils/server/analyisUtils';

interface Props {
  blogs: ArrayList<Blog>;
  tags: ArrayList<Tag>;
  categories: ArrayList<Category>;
  topArticleBlogs: Blog[];
  newBlogs: Blog[];
}

const BlogsPage: NextPage<Props> = (props: Props) => {
  const { blogs, tags, categories, topArticleBlogs, newBlogs } = props;
  const [keyword, setKeyword] = useState<string>('');
  const router = useRouter();

  const handleClickSearchButton = useCallback(() => {
    void router.push(`/blogs/search/?keyword=${keyword}`);
  }, [keyword, router]);

  const handleKeyDownSearch = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      if (e.key === 'Enter') {
        void router.push(`/blogs/search/?keyword=${keyword}`);
      }
    },
    [keyword, router],
  );

  return (
    <section className="padding-block border-bottom">
      <div className={`${String(style.blogsContainer)} container`}>
        <div className={style.mainWrapper}>
          <Blogs blogs={blogs} showPagination />
        </div>
        <div className={style.sideWrapper}>
          <BlogSideContents
            keyword={keyword}
            categories={categories}
            tags={tags}
            onClickSearchButton={handleClickSearchButton}
            onKeyDownSearch={handleKeyDownSearch}
            setKeyword={setKeyword}
            topArticleBlogs={topArticleBlogs}
            newBlogs={newBlogs}
          />
        </div>
      </div>
    </section>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const query: BlogsQuery = { offset: '0', limit: '3' };

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
    limit: '3',
  };
  const devCMS = new DevCMS();
  const blogs = await devCMS.getBlogs(query);
  const tags = await devCMS.getTags();
  const categories = await devCMS.getCategories();

  const ids = await getTopArticlePaths();
  const topBlogs = await devCMS.getBlogs({ ids });
  // cmsが順番を作成順に変えてしまうので、Articleのid順に修正
  const topArticleBlogs = compact(
    ids.map((id) => topBlogs.contents.find((b) => b.id === id)),
  );
  const newBlogs = await devCMS.getBlogs();

  return {
    props: {
      blogs,
      tags,
      categories,
      topArticleBlogs,
      newBlogs: newBlogs.contents,
    },
  };
};

export default BlogsPage;
