import classNames from 'classnames';
import { compact } from 'lodash';
import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import { useRouter } from 'next/router';
import * as React from 'react';
import { useEffect, useState } from 'react';
import DevCMS from '../../clients/DevCMS';
import BlogComponent from '../../components/shared/Blog';
import BlogHead from '../../components/shared/BlogHead';
import BlogSideContents from '../../components/shared/BlogSideContents';
import ArrayList from '../../models/Array';
import Blog from '../../models/Blog';
import Category from '../../models/Category';
import { getTopArticlePaths } from '../../utils/server/analyisUtils';
import { isPreviewData } from '../../utils/TypeGuardUtils';
import Error from '../_error';
import style from './id.module.scss';

interface Props {
  blog: Blog | null;
  errors?: string;
  categories: ArrayList<Category>;
  topArticleBlogs: Blog[];
}

const BlogDetailPage: NextPage<Props> = (props: Props) => {
  const { blog, categories, topArticleBlogs } = props;

  const [contents, setContents] = useState<HTMLHeadingElement[]>([]);
  const router = useRouter();

  useEffect(() => {
    const e = document.getElementById('blog');
    if (e) {
      const es = Array.from(e.getElementsByTagName('h2'));
      setContents(es);
    }
  }, [router]);

  return (
    <>
      {blog && blog.id ? (
        <>
          <BlogHead blog={blog} />
          <div
            className={classNames(
              style.blogsContainer,
              'container',
              'padding-block',
              'border-bottom',
            )}
          >
            <main className={style.mainWrapper} id='blog'>
              <BlogComponent blog={blog} topArticleBlogs={topArticleBlogs} />
            </main>
            <div className={style.sideWrapper}>
              <BlogSideContents
                categories={categories}
                contents={contents}
                blog={blog}
              />
            </div>
          </div>
        </>
      ) : (
        <Error statusCode={404} />
      )}
    </>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const devCMS = new DevCMS();
  const blogs = await devCMS.getBlogs({ offset: '0', limit: '9999' });
  const paths = blogs.contents.map((blog) => `/blogs/${blog.id ?? ''}`);

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

  const categories = await devCMS.getCategories();

  const ids = await getTopArticlePaths();
  const topBlogs = await devCMS.getBlogs({ ids });
  // cmsが順番を作成順に変えてしまうので、Articleのid順に修正
  const topArticleBlogs = compact(
    ids.map((id) => topBlogs.contents.find((b) => b.id === id)),
  );

  return {
    props: {
      blog,
      categories,
      topArticleBlogs,
    },
  };
};

export default BlogDetailPage;
