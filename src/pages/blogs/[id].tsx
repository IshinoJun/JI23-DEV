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
import Highlight from "react-highlight";
import Link from "next/link";
import ArrayList from "../../models/Array";

interface Props {
  blog: Blog | null;
  blogs: ArrayList<Blog>;
  errors?: string;
}

const BlogDetail: NextPage<Props> = (props: Props) => {
  const { blog, blogs } = props;
  const headerProps: HeaderProps = {
    title: "Blog",
    subTitle: "ブログ",
    linkProps: { href: "/blogs" },
    imgProps: { src: "/blog.png", alt: "Blogs" },
  } as const;

  const blogIndex = blogs.contents.map((c) => c.id).indexOf(blog?.id ?? "");
  const nextBlog = blogs.contents[blogIndex - 1];
  const prevBlog = blogs.contents[blogIndex + 1];

  return (
    <>
      {blog ? (
        <Layout title={blog.title} headerProps={headerProps}>
          <section className="padding-block border-bottom">
            <div className={style.blogContainer}>
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
                  <Highlight innerHTML>{blog.content}</Highlight>
                </div>
              </div>
              <ul className={style.linkArea}>
                <li>
                  {prevBlog && (
                    <Link href="/blogs/[id]" as={`/blogs/${prevBlog.id}`}>
                      <a>{"← " + prevBlog.title}</a>
                    </Link>
                  )}
                </li>
                <li>
                  {nextBlog && (
                    <Link href="/blogs/[id]" as={`/blogs/${nextBlog.id}`}>
                      <a>{nextBlog.title + " →"}</a>
                    </Link>
                  )}
                </li>
              </ul>
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
  const paths = res.contents.map((item) => `/blogs/${item.id}`);
  console.log(paths);

  return { paths, fallback: false };
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

  const blogs = await devClient.getBlogs();

  return {
    props: { blog, blogs },
  };
};

export default BlogDetail;
