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
import { formatDate, formatOgpSetting } from "../../utils/FormatUtils";
import Tags from "../../components/shared/Tags";
import Highlight from "react-highlight";
import Link from "next/link";
import ArrayList from "../../models/Array";
import HeadProps from "../../models/HeadProps";
import { useRouter } from "next/router";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import LocalOfferIcon from "@material-ui/icons/LocalOffer";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import { useContextImageContext } from "../../context/ImageContext";

interface Props {
  blog: Blog | null;
  blogs: ArrayList<Blog>;
  errors?: string;
}

const BlogDetail: NextPage<Props> = (props: Props) => {
  const { blog, blogs } = props;
  const router = useRouter();

  const images = useContextImageContext();

  const headerProps: HeaderProps = {
    title: "Blog",
    subTitle: "ブログ",
    linkProps: { href: "/blogs" },
    imgProps: { src: images.blogImage.url, alt: "Blogs" },
  } as const;

  const headProps: HeadProps = {
    title: blog?.ogpTitle ?? "",
    type: "article",
    description: blog?.introduction ?? "",
    image: formatOgpSetting(blog?.ogp.url ?? "", blog?.ogpTitle ?? ""),
    url: `${process.env.NEXT_PUBLIC_BASE_URL ?? ""}${router.asPath}`,
  } as const;

  const blogIndex = blogs.contents.map((c) => c.id).indexOf(blog?.id ?? "");
  const nextBlog = blogs.contents[blogIndex - 1];
  const prevBlog = blogs.contents[blogIndex + 1];

  return (
    <>
      {blog ? (
        <Layout headProps={headProps} headerProps={headerProps}>
          <section className="padding-block border-bottom">
            <div className={style.blogContainer}>
              <div className={style.wrapper}>
                <div className={style.contact}>
                  <div className={style.blog}>
                    <img src={formatOgpSetting(blog.ogp.url, blog.ogpTitle)} />
                    <header className={style.entryHeader}>
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
                    </header>
                    <Highlight innerHTML className="markdown-body">
                      {blog.content}
                    </Highlight>
                  </div>
                </div>
                <ul className={style.linkArea}>
                  <li>
                    {prevBlog && (
                      <Link href="/blogs/[id]" as={`/blogs/${prevBlog.id}`}>
                        <a>
                          <ArrowBackIcon
                            fontSize="large"
                            className={style.arrow}
                            style={{ marginRight: 20 }}
                          />
                          <div>
                            <p className={style.tag}>
                              <LocalOfferIcon />
                              {prevBlog.tags?.map((tag, index) => (
                                <span key={index}>
                                  {tag.name}
                                  {index + 1 !== prevBlog.tags?.length
                                    ? ", "
                                    : ""}
                                </span>
                              ))}
                            </p>
                            <p
                              className={[style.text, style.ellipsis].join(" ")}
                            >
                              {prevBlog.title}
                            </p>
                            <p className={style.date}>
                              <AccessTimeIcon />
                              <span>{formatDate(new Date(prevBlog.date))}</span>
                            </p>
                          </div>
                        </a>
                      </Link>
                    )}
                  </li>
                  <li>
                    {nextBlog && (
                      <Link href="/blogs/[id]" as={`/blogs/${nextBlog.id}`}>
                        <a>
                          <div style={{ marginLeft: 55 }}>
                            <p className={style.tag}>
                              <LocalOfferIcon />
                              {nextBlog.tags?.map((tag, index) => (
                                <span key={index}>
                                  {tag.name}
                                  {index + 1 !== nextBlog.tags?.length
                                    ? ", "
                                    : ""}
                                </span>
                              ))}
                            </p>
                            <p
                              className={[style.text, style.ellipsis].join(" ")}
                            >
                              {nextBlog.title}
                            </p>
                            <p className={style.date}>
                              <AccessTimeIcon />
                              <span>{formatDate(new Date(nextBlog.date))}</span>
                            </p>
                          </div>
                          <ArrowForwardIcon
                            fontSize="large"
                            className={style.arrow}
                            style={{ marginLeft: 20 }}
                          />
                        </a>
                      </Link>
                    )}
                  </li>
                </ul>
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
  const paths = res.contents.map((item) => `/blogs/${item.id}`);

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
