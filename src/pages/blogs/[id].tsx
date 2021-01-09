import { NextPage, GetStaticPaths, GetStaticProps } from 'next';
import * as React from 'react';

import { useCallback, useEffect, useState, useContext } from 'react';
import { useRouter } from 'next/router';
import { compact } from 'lodash';
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
import Category from '../../models/Category';
import { getTopArticlePaths } from '../../utils/server/analyisUtils';

import SearchContext from '../../context/searchContext';

interface Props {
  blog: Blog | null;
  errors?: string;
  tags: ArrayList<Tag>;
  categories: ArrayList<Category>;
  topArticleBlogs: Blog[];
  newBlogs: Blog[];
}

const BlogDetailPage: NextPage<Props> = (props: Props) => {
  const { blog, tags, categories, topArticleBlogs, newBlogs } = props;

  const [contents, setContents] = useState<HTMLHeadingElement[]>([]);
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
            className={`${String(
              style.blogsContainer,
            )} container padding-block border-bottom`}
          >
            <main className={style.mainWrapper} id="blog">
              <BlogComponent blog={blog} />
            </main>
            <div className={style.sideWrapper}>
              <BlogSideContents
                keyword={search}
                categories={categories}
                tags={tags}
                onClickSearchButton={handleClickSearchButton}
                onKeyDownSearch={handleKeyDownSearch}
                setKeyword={setSearch}
                contents={contents}
                blog={blog}
                topArticleBlogs={topArticleBlogs}
                newBlogs={newBlogs}
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
  const blogs = await devCMS.getBlogs();
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

  const tags = await devCMS.getTags();
  const categories = await devCMS.getCategories();

  const ids = await getTopArticlePaths();
  const topBlogs = await devCMS.getBlogs({ ids });
  // cmsが順番を作成順に変えてしまうので、Articleのid順に修正
  const topArticleBlogs = compact(
    ids.map((id) => topBlogs.contents.find((b) => b.id === id)),
  );
  const newBlogs = await devCMS.getBlogs({ offset: '0', limit: '5' });

  return {
    props: {
      blog,
      tags,
      categories,
      topArticleBlogs,
      newBlogs: newBlogs.contents,
    },
  };
};

export default BlogDetailPage;
