import React, { useState } from 'react';
import { NextPage, GetStaticProps, GetStaticPaths } from 'next';
import { useRouter } from 'next/router';
import style from './[offset].module.scss';

import DevCMS from '../../api/DevCMS';
import Blog from '../../../models/Blog';
import ArrayList from '../../../models/Array';
import Tag from '../../../models/Tag';
import Blogs from '../../../components/shared/Blogs';
import BlogSideContents from '../../../components/shared/BlogSideContents';
import createOgp from '../../../utils/server/ogpUtils';
import BlogsQuery from '../../../models/BlogsQuery';

interface Props {
  blogs: ArrayList<Blog>;
  tags: ArrayList<Tag>;
}

const BlogsPage: NextPage<Props> = (props: Props) => {
  const { blogs, tags } = props;
  const [keyword, setKeyword] = useState<string>('');
  const router = useRouter();

  const handleClickSearchButton = () => {
    void router.push(`/blogs/search/?keyword=${keyword}`);
  };

  const handleKeyDownSearch = (
    e: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    if (e.key === 'Enter') {
      void router.push(`/blogs/search/?keyword=${keyword}`);
    }
  };

  return (
    <section className="padding-block border-bottom">
      <div className={`${String(style.blogsContainer)} container`}>
        <div className={style.mainWrapper}>
          <Blogs blogs={blogs} showPagination />
        </div>
        <div className={style.sideWrapper}>
          <BlogSideContents
            keyword={keyword}
            tags={tags}
            onClickSearchButton={handleClickSearchButton}
            onKeyDownSearch={handleKeyDownSearch}
            setKeyword={setKeyword}
          />
        </div>
      </div>
    </section>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const devCMS = new DevCMS();
  const blogs = await devCMS.getBlogs();
  const paths = [...Array(blogs.offset + 1)]
    .map((_, i) => i + 1)
    .map((offset) => `/blogs/page/${offset}`);

  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async ({
  params,
}): Promise<{
  props: Props;
}> => {
  const query: BlogsQuery = { offset: String(params?.offset), limit: '10' };
  const devCMS = new DevCMS();
  const blogs = await devCMS.getBlogs(query);
  const tags = await devCMS.getTags();

  blogs.contents.forEach((blog) => {
    void createOgp(blog);
  });

  return {
    props: {
      blogs,
      tags,
    },
  };
};

export default BlogsPage;
