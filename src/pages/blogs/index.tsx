import React from "react";
import style from "./index.module.scss";

import { NextPage, GetStaticProps } from "next";
import HeaderProps from "../../models/HeaderProps";
import Layout from "../../components/shared/Layout";
import DevClient from "../../pages/api/DevClient";
import Blog from "../../models/Blog";
import ArrayList from "../../models/Array";
import Link from "next/link";
import { isPreviewData } from "../../utils/TypeGuardUtils";
import { formatDate } from "../../utils/FormatUtils";
import AccessTimeIcon from "@material-ui/icons/AccessTime";
import Tags from "../../components/shared/Tags";
import { Button } from "@material-ui/core";

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
    <Layout title="Blogs" headerProps={headerProps}>
      <section className="padding-block border-bottom">
        <div className="container">
          {blogs.contents.map((blog, index) => (
            <div key={index} className={style.contact}>
              <div className={style.blog}>
                <div className={style.photo}>
                  <img src={blog.ogp.url} />
                </div>
                <h3>{blog.title}</h3>
                <div className={style.date}>
                  <AccessTimeIcon />
                  <span>{formatDate(new Date(blog.date))}</span>
                </div>
                <p className={style.introduction}>{blog.introduction}</p>
                <Tags tags={blog.tags} tagsPosition="left" />
                <Button
                  type="button"
                  variant="contained"
                  style={{ textTransform: "none" }}
                >
                  <Link href="/blogs/[id]" as={`/blogs/${blog.id}`}>
                    <a>Read More</a>
                  </Link>
                </Button>
              </div>
            </div>
          ))}
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
