import * as React from 'react';
import Head from 'next/head';
import Blog from '../../models/Blog';

interface Props {
  blog: Blog;
}

const BlogHead: React.FC<Props> = (props: Props) => {
  const { blog } = props;
  const defaultTitle = 'JI23-DEV';
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? '';

  return blog.id ? (
    <Head>
      <title>{`${blog.title} | ${defaultTitle}`}</title>
      <meta name="Description" content={blog.introduction} />
      <meta property="og:title" content={blog.title} />
      <meta property="og:description" content={blog.introduction} />
      <meta
        property="og:image"
        content={`${baseUrl}/api/blogs/${blog.id}/ogp`}
      />
      <meta name="twitter:title" content={`${blog.title} | ${defaultTitle}`} />
      <meta name="twitter:description" content={blog.introduction} />
      <meta
        name="twitter:image"
        content={`${baseUrl}/api/blogs/${blog.id}/ogp`}
      />
    </Head>
  ) : null;
};

export default BlogHead;
