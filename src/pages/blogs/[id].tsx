import { NextPage, GetStaticPaths, GetStaticProps } from 'next';
import * as React from 'react';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Error from '../_error';
import Blog from '../../models/Blog';
import DevCMS from '../api/DevCMS';
import { isPreviewData } from '../../utils/TypeGuardUtils';
import style from './id.module.scss';
import ArrayList from '../../models/Array';
import BlogHead from '../../components/shared/BlogHead';
import BlogComponent from '../../components/shared/Blog';
import Tag from '../../models/Tag';
import BlogSideContents from '../../components/shared/BlogSideContents';

interface Props {
  blog: Blog | null;
  errors?: string;
  tags: ArrayList<Tag>;
}

const BlogDetailPage: NextPage<Props> = (props: Props) => {
  const { blog, tags } = props;

  const [contents, setContents] = useState<HTMLHeadingElement[]>([]);
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

  useEffect(() => {
    const e = document.getElementById('blog');
    if (e) {
      const es = Array.from(e.getElementsByTagName('h2'));
      setContents(es);
    }
  }, []);

  return (
    <>
      {blog && blog.id ? (
        <>
          <BlogHead blog={blog} />
          <section className="padding-block border-bottom">
            <div className={`${String(style.blogsContainer)} container`}>
              <div className={style.mainWrapper} id="blog">
                <BlogComponent blog={blog} />
              </div>
              <div className={style.sideWrapper}>
                <BlogSideContents
                  keyword={keyword}
                  tags={tags}
                  onClickSearchButton={handleClickSearchButton}
                  onKeyDownSearch={handleKeyDownSearch}
                  setKeyword={setKeyword}
                  contents={contents}
                  blog={blog}
                />
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
  // blogs.contents.forEach((blog) => void createOgp(blog));

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

  const tags = await devCMS.getTags();

  return {
    props: { blog, tags },
  };
};

export default BlogDetailPage;
