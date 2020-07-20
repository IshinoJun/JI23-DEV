import { NextPage, GetStaticPaths, GetStaticProps } from "next";
import ErrorPage from "next/error";
import Link from "next/link";
import * as React from "react";
import Blog from "../../models/Blog";
import DevClient from "../../pages/api/DevClient";
import { isPreviewData } from "../../utils/TypeGuardUtils";
import Layout from "../../components/shared/Layout";
import HeaderProps from "../../models/HeaderProps";

interface Props {
  blog: Blog | null;
  errors?: string;
}

const BlogDetail: NextPage<Props> = (props: Props) => {
  const { blog } = props;
  const headerProps: HeaderProps = {
    title: "Blogs",
    subTitle: "ブログ",
    linkProps: { href: "/" },
    imgProps: { src: "/blog.png", alt: "Blogs" },
  } as const;

  return (
    <>
      {blog ? (
        <Layout title={blog.title} headerProps={headerProps}>
          <h1 className="title">ブログ詳細</h1>
          <Link href="/blogs/">
            <a className="link">ブログトップへ</a>
          </Link>
          <div className="item">
            <h2 className="item__title">{blog.title}</h2>
          </div>
        </Layout>
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
