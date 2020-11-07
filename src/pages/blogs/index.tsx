import React from 'react';
import { NextPage, GetStaticProps } from 'next';
import Link from 'next/link';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import { Button } from '@material-ui/core';
import style from './index.module.scss';

import DevCMS from '../api/DevCMS';
import Blog from '../../models/Blog';
import ArrayList from '../../models/Array';
import { isPreviewData } from '../../utils/TypeGuardUtils';
import { formatDate } from '../../utils/FormatUtils';
import Tags from '../../components/shared/Tags';

interface Props {
  blogs: ArrayList<Blog>;
}

const Blogs: NextPage<Props> = (props: Props) => {
  const { blogs } = props;
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? '';

  return (
    <section className="padding-block border-bottom">
      <div className="container">
        <div className={style.wrapper}>
          {blogs.contents.map(
            (blog) =>
              blog.id && (
                <div key={blog.id} className={style.content}>
                  <div className={style.blog}>
                    <Link href="/blogs/[id]" as={`/blogs/${blog.id}`}>
                      <a>
                        <img
                          src={`${baseUrl}/api/blogs/${blog.id}/ogp`}
                          alt="ブログ画像"
                        />
                      </a>
                    </Link>
                    <div className={style.date}>
                      <AccessTimeIcon />
                      <span>{formatDate(new Date(blog.date))}</span>
                    </div>
                    <Link href="/blogs/[id]" as={`/blogs/${blog.id}`}>
                      <a>
                        <h2>{blog.title}</h2>
                      </a>
                    </Link>
                    <Tags tags={blog.tags} tagsPosition="left" />
                    <Button
                      style={{ marginTop: 20 }}
                      type="button"
                      variant="contained"
                      className={style.read}
                      aria-label="記事を読む"
                    >
                      <Link href="/blogs/[id]" as={`/blogs/${blog.id}`}>
                        <a>記事を読む</a>
                      </Link>
                    </Button>
                  </div>
                </div>
              ),
          )}
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
  const res = await devCMS.getBlogs();

  // プレビュー時は draft のコンテンツを追加
  if (preview && isPreviewData(previewData)) {
    const previewDataId = previewData.id;
    const { draftKey } = previewData;
    const draftRes = await devCMS.getBlogPreview(previewDataId, draftKey);
    res.contents.unshift(draftRes);
  }

  return {
    props: {
      blogs: res,
    },
  };
};

export default Blogs;
