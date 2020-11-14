import React from 'react';
import { NextPage, GetStaticProps, GetStaticPaths } from 'next';
import style from './id.module.scss';

import DevCMS from '../../api/DevCMS';
import Blog from '../../../models/Blog';
import ArrayList from '../../../models/Array';
import Blogs from '../../../components/shared/Blogs';
import Tag from '../../../models/Tag';
import BlogsQuery from '../../../models/BlogsQuery';
import BlogTagList from '../../../components/shared/BlogTagList';

interface Props {
  blogs: ArrayList<Blog>;
  tags: ArrayList<Tag>;
  targetTag: Tag;
}

const TagBlogsPage: NextPage<Props> = (props: Props) => {
  const { blogs, tags, targetTag } = props;

  return (
    <section className="padding-block border-bottom">
      <div className={style.tagNameWrapper}>
        <h1>{targetTag.name}</h1>
      </div>
      <div className={`${String(style.blogsContainer)} container`}>
        <div className={style.mainWrapper}>
          <Blogs blogs={blogs} />
        </div>
        <div className={style.sideWrapper}>
          <BlogTagList tags={tags} />
        </div>
      </div>
    </section>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const devCMS = new DevCMS();
  const tags = await devCMS.getTags();
  const paths = tags.contents.map((tag) => `/blogs/tags/${tag.id ?? ''}`);

  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async ({
  params,
}): Promise<{
  props: Props;
}> => {
  const devCMS = new DevCMS();
  const tagId = params?.id?.toString() ?? '';
  const query: BlogsQuery = { tagId };
  const blogs = await devCMS.getBlogs(query);
  const tags = await devCMS.getTags();
  const targetTag = await devCMS.getTag(tagId);

  return {
    props: {
      blogs,
      tags,
      targetTag,
    },
  };
};

export default TagBlogsPage;
