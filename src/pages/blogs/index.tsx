import classNames from 'classnames';
import { GetStaticProps, NextPage } from 'next';
import React from 'react';
import DevCMS from '../../clients/DevCMS';
import Blogs from '../../components/shared/Blogs';
import BlogSideContents from '../../components/shared/BlogSideContents';
import ArrayList from '../../models/Array';
import Blog from '../../models/Blog';
import BlogsQuery from '../../models/BlogsQuery';
import Category from '../../models/Category';
import { isPreviewData } from '../../utils/TypeGuardUtils';
import style from './index.module.scss';

interface Props {
  blogs: ArrayList<Blog>;
  categories: ArrayList<Category>;
}

const BlogsPage: NextPage<Props> = (props: Props) => {
  const { blogs, categories } = props;

  return (
    <div
      className={classNames(
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

export const getStaticProps: GetStaticProps = async ({
  preview,
  previewData,
}): Promise<{
  props: Props;
}> => {
  const query: BlogsQuery = { offset: '0', limit: '10' };
  const devCMS = new DevCMS();
  const blogs = await devCMS.getBlogs(query);
  const categories = await devCMS.getCategories();

  // プレビュー時は draft のコンテンツを追加
  if (preview && isPreviewData(previewData)) {
    const previewDataId = previewData.id;
    const { draftKey } = previewData;
    const draftRes = await devCMS.getBlogPreview(previewDataId, draftKey);
    blogs.contents.unshift(draftRes);
  }

  return {
    props: {
      blogs,
      categories,
    },
  };
};

export default BlogsPage;
