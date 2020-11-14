import { NextPage, GetStaticPaths, GetStaticProps } from 'next';
import * as React from 'react';

import Error from '../_error';
import Blog from '../../models/Blog';
import DevCMS from '../api/DevCMS';
import { isPreviewData } from '../../utils/TypeGuardUtils';
import style from './id.module.scss';
import ArrayList from '../../models/Array';
import BlogHead from '../../components/shared/BlogHead';
import { createOgp } from '../../utils/OgpUtils';
import BlogComponent from '../../components/shared/Blog';
import BlogTagList from '../../components/shared/BlogTagList';
import Tag from '../../models/Tag';

interface Props {
  blog: Blog | null;
  blogs: ArrayList<Blog>;
  errors?: string;
  tags: ArrayList<Tag>;
}

const BlogDetailPage: NextPage<Props> = (props: Props) => {
  const { blog, blogs, tags } = props;

  return (
    <>
      {blog && blog.id ? (
        <>
          <BlogHead blog={blog} />
          <section className="padding-block border-bottom">
            <div className={`${String(style.blogsContainer)} container`}>
              <div className={style.mainWrapper}>
                <BlogComponent blog={blog} blogs={blogs} />
              </div>
              <div className={style.sideWrapper}>
                <BlogTagList tags={tags} />
              </div>
            </div>
          </section>
        </>
      ) : (
        <Error statusCode={404} />
      )}
    </>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const devCMS = new DevCMS();
  const blogs = await devCMS.getBlogs();
  const paths = blogs.contents.map((blog) => `/blogs/${blog.id ?? ''}`);
  blogs.contents.forEach((blog) => void createOgp(blog));

  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async ({
  params,
  preview,
  previewData,
}): Promise<{
  props: Props;
}> => {
  const devCMS = new DevCMS();

  let blog: Blog | null = null;
  const paramsId = params?.id?.toString() ?? '';

  // 下書きは draftKey を含む必要があるのでプレビューの時は追加
  if (preview && isPreviewData(previewData)) {
    blog = await devCMS.getBlogPreview(paramsId, previewData.draftKey);
  } else {
    blog = await devCMS.getBlog(paramsId);
  }

  const blogs = await devCMS.getBlogs();
  const tags = await devCMS.getTags();

  return {
    props: { blog, blogs, tags },
  };
};

export default BlogDetailPage;
