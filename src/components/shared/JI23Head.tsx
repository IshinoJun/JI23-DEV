import * as React from 'react';
import Head from 'next/head';
import HeadProps from '../../models/HeadProps';

const JI23Head: React.FC<HeadProps> = (props: HeadProps) => {
  const { title, description, image, url, type } = props;

  const defaultTitle = 'JI23-DEV';
  const defaultDescription = '技術的なことをゆる〜く書くブログ兼ポートフォリオ';
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? '';

  return (
    <Head>
      <title>{`${title} | ${defaultTitle}`}</title>
      <meta name="Description" content={description ?? defaultDescription} />
      <meta property="og:url" content={baseUrl + url} />
      <meta property="og:type" content={type} />
      <meta property="og:title" content={`${title} | ${defaultTitle}`} />
      <meta
        property="og:description"
        content={description ?? defaultDescription}
      />
      <meta property="og:site_name" content={defaultTitle} />
      <meta
        property="og:image"
        content={image ?? `${baseUrl}/defaultOgpImage.png`}
      />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@JJ_1123_I" />
      <meta name="twitter:url" content={baseUrl + url} />
      <meta name="twitter:title" content={`${title} | ${defaultTitle}`} />
      <meta
        name="twitter:description"
        content={description ?? defaultDescription}
      />
      <meta
        name="twitter:image"
        content={image ?? `${baseUrl}/defaultOgpImage.png`}
      />
      <link rel="canonical" href={baseUrl + url} />
    </Head>
  );
};

export default JI23Head;
