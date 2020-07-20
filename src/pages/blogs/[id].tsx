import { NextPage, GetStaticPaths, GetStaticProps } from "next";
import ErrorPage from "next/error";
import * as React from "react";
import Blog from "../../models/Blog";
import DevClient from "../../pages/api/DevClient";
import { isPreviewData } from "../../utils/TypeGuardUtils";
import Layout from "../../components/shared/Layout";
import HeaderProps from "../../models/HeaderProps";
import style from "./id.module.scss";
import AccessTimeIcon from "@material-ui/icons/AccessTime";
import { formatDate } from "../../utils/FormatUtils";
import Tags from "../../components/shared/Tags";

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
          <section className="padding-block border-bottom">
            <div className="container">
              <div className={style.contact}>
                <div className={style.blog}>
                  <div className={style.photo}>
                    <img src={blog.ogp.url} />
                  </div>
                  <h3>{blog.title}</h3>
                  <div className={style.date}>
                    <AccessTimeIcon />
                    <span>{formatDate(new Date(blog.date))}</span>
                  </div>
                  <Tags tags={blog.tags} tagsPosition="left" />
                  <div
                    dangerouslySetInnerHTML={{ __html: `${blog.content}` }}
                  />
                </div>
              </div>
            </div>
          </section>
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
