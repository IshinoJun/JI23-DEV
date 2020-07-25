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
import { formatDate, formatOgpSetting } from "../../utils/FormatUtils";
import AccessTimeIcon from "@material-ui/icons/AccessTime";
import Tags from "../../components/shared/Tags";
import { Button } from "@material-ui/core";
import HeadProps from "../../models/HeadProps";
import { useContextImageContext } from "../../context/ImageContext";

interface Props {
  blogs: ArrayList<Blog>;
}

const BlogIndex: NextPage<Props> = (props: Props) => {
  const { blogs } = props;

  const images = useContextImageContext();

  const headerProps: HeaderProps = {
    title: "Blogs",
    subTitle: "ブログ一覧",
    linkProps: { href: "/" },
    imgProps: { src: images.blogImage.url, alt: "Blogs" },
  } as const;

  const headProps: HeadProps = {
    title: "Blogs",
    type: "article",
    description: "JI23-DEVのブログ一覧のページになります。",
    image: images.blogImage.url,
    url: `${process.env.NEXT_PUBLIC_BASE_URL ?? ""}/blogs`,
  } as const;

  return (
    <Layout headProps={headProps} headerProps={headerProps}>
      <section className="padding-block border-bottom">
        <div className="container">
          <div className={style.wrapper}>
            {blogs.contents.map((blog, index) => (
              <div key={index} className={style.content}>
                <div className={style.blog}>
                  <Link href="/blogs/[id]" as={`/blogs/${blog.id}`}>
                    <a>
                      <img
                        src={formatOgpSetting(blog.ogp.url, blog.ogpTitle)}
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
                      <h3>{blog.title}</h3>
                    </a>
                  </Link>
                  <Tags tags={blog.tags} tagsPosition="left" />
                  <Button
                    style={{ marginTop: 20 }}
                    type="button"
                    variant="contained"
                    className={style.read}
                  >
                    <Link href="/blogs/[id]" as={`/blogs/${blog.id}`}>
                      <a>記事を読む</a>
                    </Link>
                  </Button>
                </div>
              </div>
            ))}
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
