import React from "react";
import style from "./index.module.scss";

import { NextPage, GetStaticPaths, GetStaticProps } from "next";
import HeaderProps from "../../models/HeaderProps";
import Layout from "../../components/shared/Layout";
import DevClient from "../../api/DevClient";
import Blog from "../../api/models/Blog";
import ArrayList from "../../api/models/Array";
import Head from "next/head";
import Link from "next/link";
import { isPreviewData } from "../../utils/TypeGuardUtils";

interface Props {
  blogs: ArrayList<Blog>;
}

const BlogIndex: NextPage<Props> = (props: Props) => {
  const { blogs } = props;

  const headerProps: HeaderProps = {
    title: "Blogs",
    subTitle: "ブログ",
    linkProps: { href: "/" },
    imgProps: { src: "/blog.png", alt: "Blogs" },
  } as const;

  return (
    <Layout title="Blogs | dev-blog" headerProps={headerProps}>
      <section className="padding-block border-bottom">
        <div className="container">
          <div className={style.contact}>
            <Head>
              <title>blogs</title>
            </Head>

            <h1 className="title">ブログトップ</h1>
            <Link href="/">
              <a className="link">ホームへ</a>
            </Link>
            <div>
              {blogs.contents.map((blog, index) => (
                <div key={index}>
                  <h2>{blog.title}</h2>
                  <p>{blog.introduction}</p>
                  <Link href="/blogs/[id]" as={`/blogs/${blog.id}`}>
                    <a>詳細へ</a>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export const getStaticProps: GetStaticProps = async ({
  preview,
  previewData,
}): Promise<{
  props: Props;
}> => {
  const devClient = new DevClient();
  const res = await devClient.getBlogs();

  // プレビュー時は draft のコンテンツを追加
  if (preview && isPreviewData(previewData)) {
    const previewDataId = previewData.id;
    const draftKey = previewData.draftKey;
    const draftRes = await devClient.getBlogPreview(previewDataId, draftKey);
    res.contents.unshift(draftRes);
  }
  return {
    props: {
      blogs: res,
    },
  };
};

export default BlogIndex;
