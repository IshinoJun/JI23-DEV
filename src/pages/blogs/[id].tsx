import { NextPage, GetStaticPaths, GetStaticProps } from 'next';
import * as React from 'react';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import Highlight from 'react-highlight';
import Link from 'next/link';
import { useRouter } from 'next/router';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import LocalOfferIcon from '@material-ui/icons/LocalOffer';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import Error from '../_error';
import Blog from '../../models/Blog';
import DevCMS from '../api/DevCMS';
import { isPreviewData } from '../../utils/TypeGuardUtils';
import Layout from '../../components/shared/Layout';
import style from './id.module.scss';
import { formatDate } from '../../utils/FormatUtils';
import Tags from '../../components/shared/Tags';
import ArrayList from '../../models/Array';
import HeadProps from '../../models/HeadProps';

interface Props {
  blog: Blog | null;
  blogs: ArrayList<Blog>;
  errors?: string;
}

const BlogDetail: NextPage<Props> = (props: Props) => {
  const { blog, blogs } = props;
  const router = useRouter();
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? '';

  const headProps: HeadProps = {
    id: blog?.id,
    title: blog?.title ?? '',
    type: 'article',
    description: blog?.introduction ?? '',
    url: `${router.asPath}`,
  } as const;

  const blogIndex = blogs.contents.map((c) => c.id).indexOf(blog?.id ?? '');
  const nextBlog = blogs.contents[blogIndex - 1];
  const prevBlog = blogs.contents[blogIndex + 1];

  return (
    <>
      {blog && blog.id ? (
        <Layout headProps={headProps}>
          <section className="padding-block border-bottom">
            <div className={style.blogContainer}>
              <div className={style.wrapper}>
                <div className={style.contact}>
                  <div className={style.blog}>
                    <img
                      src={`${baseUrl}/api/blogs/${blog.id}/ogp`}
                      alt="ブログ画像"
                    />
                    <div className={style.entryHeader}>
                      <div className={style.date}>
                        <AccessTimeIcon />
                        <span>{formatDate(new Date(blog.date))}</span>
                      </div>
                      <h1>{blog.title}</h1>
                      <Tags tags={blog.tags} tagsPosition="left" />
                    </div>
                    <Highlight innerHTML className="markdown-body">
                      {blog.content}
                    </Highlight>
                  </div>
                </div>
                <ul className={style.linkArea}>
                  <li>
                    {prevBlog && prevBlog.id && (
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
                                    ? ', '
                                    : ''}
                                </span>
                              ))}
                            </p>
                            <p
                              className={[style.text, style.ellipsis].join(' ')}
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
                    {nextBlog && nextBlog.id && (
                      <Link href="/blogs/[id]" as={`/blogs/${nextBlog.id}`}>
                        <a>
                          <div style={{ marginLeft: 55 }}>
                            <p className={style.tag}>
                              <LocalOfferIcon />
                              {nextBlog.tags?.map((tag, index) => (
                                <span key={index}>
                                  {tag.name}
                                  {index + 1 !== nextBlog.tags?.length
                                    ? ', '
                                    : ''}
                                </span>
                              ))}
                            </p>
                            <p
                              className={[style.text, style.ellipsis].join(' ')}
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
        <Error statusCode={404} />
      )}
    </>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const devCMS = new DevCMS();
  const res = await devCMS.getBlogs();
  const paths = res.contents.map((item) => `/blogs/${item.id ?? ''}`);

  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async ({
  params,
  preview,
  previewData,
}): Promise<{
  props: Props;
}> => {
  const devCMS = new DevCMS();

  let blog: Blog | null = null;
  const paramsId = params?.id?.toString() ?? '';

  // 下書きは draftKey を含む必要があるのでプレビューの時は追加
  if (preview && isPreviewData(previewData)) {
    blog = await devCMS.getBlogPreview(paramsId, previewData.draftKey);
  } else {
    blog = await devCMS.getBlog(paramsId);
  }

  const blogs = await devCMS.getBlogs();

  return {
    props: { blog, blogs },
  };
};

export default BlogDetail;
