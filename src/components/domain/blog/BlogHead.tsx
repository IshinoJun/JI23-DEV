import { htmlToText } from 'html-to-text';
import Head from 'next/head';
import * as React from 'react';
import { Blog } from '../../../models';

interface Props {
  blog: Blog;
}

export const BlogHead: React.FC<Props> = (props: Props) => {
  const { blog } = props;
  const defaultTitle = 'JI23-DEV';
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? '';

  const getDescription = (description: string): string => {
    const body = description.trim().replace(/[ \r\n]/g, '');
    if (body.length < 140) {
      return body;
    }

    return `${body.substring(0, 140)}...`;
  };

  const description = getDescription(htmlToText(blog.content));

  return blog.id ? (
    <Head>
      <title>{`${blog.title} | ${defaultTitle}`}</title>
      <meta name='description' content={description} />
      <meta property='og:title' content={`${blog.title} | ${defaultTitle}`} />
      <meta property='og:description' content={description} />
      <meta
        property='og:image'
        content={`${baseUrl}/api/blogs/${blog.id}/ogp`}
      />
      <meta name='twitter:title' content={`${blog.title} | ${defaultTitle}`} />
      <meta name='twitter:description' content={description} />
      <meta
        name='twitter:image'
        content={`${baseUrl}/api/blogs/${blog.id}/ogp`}
      />
    </Head>
  ) : null;
};
