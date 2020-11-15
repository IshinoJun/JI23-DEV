import React, { useState } from 'react';
import { NextPage, GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import style from './index.module.scss';

import DevCMS from '../api/DevCMS';
import Blog from '../../models/Blog';
import ArrayList from '../../models/Array';
import { isPreviewData } from '../../utils/TypeGuardUtils';
import Tag from '../../models/Tag';
import Blogs from '../../components/shared/Blogs';
import BlogTagList from '../../components/shared/BlogTagList';
import SearchInput from '../../components/shared/SearchInput';

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
          <Blogs blogs={blogs} />
        </div>
        <div className={style.sideWrapper}>
          <div className={style.searchInputWrapper}>
            <SearchInput
              keyword={keyword}
              setKeyword={setKeyword}
              onClickSearchButton={handleClickSearchButton}
              onKeyDownSearch={handleKeyDownSearch}
            />
          </div>
          <BlogTagList tags={tags} />
        </div>
      </div>
    </section>
  );
};

export const getStaticProps: GetStaticProps = async ({
  preview,
  previewData,
}): Promise<{
  props: Props;
}> => {
  const devCMS = new DevCMS();
  const blogs = await devCMS.getBlogs();
  const tags = await devCMS.getTags();

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
      tags,
    },
  };
};

export default BlogsPage;
