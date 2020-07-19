import { NextPage, GetStaticPaths, GetStaticProps } from "next";
import ErrorPage from "next/error";
import Head from "next/head";
import Link from "next/link";
import * as React from "react";
import Blog from "../../api/models/Blog";
import DevClient from "../../api/DevClient";
import { isPreviewData } from "../../utils/TypeGuardUtils";

interface Props {
  blog: Blog | null;
  errors?: string;
}

const BlogDetail: NextPage<Props> = (props: Props) => {
  const { blog } = props;

  return (
    <>
      {blog ? (
        <>
          <Head>
            <title>ブログ詳細</title>
          </Head>
          <h1 className="title">ブログ詳細</h1>
          <Link href="/blogs/">
            <a className="link">ブログトップへ</a>
          </Link>
          <div className="item">
            <h2 className="item__title">{blog.title}</h2>
          </div>
        </>
      ) : (
        <ErrorPage statusCode={404} />
      )}
    </>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const devClient = new DevClient();
  const res = await devClient.getBlogs();
  const paths = res.contents.map((item) => ({
    params: { id: item.id },
  }));

  return { paths, fallback: true };
};

export const getStaticProps: GetStaticProps = async ({
  params,
  preview,
  previewData,
}): Promise<{
  props: Props;
}> => {
  const devClient = new DevClient();

  let blog: Blog | null = null;
  const paramsId = params?.id?.toString() ?? "";

  // 下書きは draftKey を含む必要があるのでプレビューの時は追加
  if (preview && isPreviewData(previewData)) {
    blog = await devClient.getBlogPreview(paramsId, previewData.draftKey);
  } else {
    blog = await devClient.getBlog(paramsId);
  }

  return {
    props: { blog },
  };
};

export default BlogDetail;
