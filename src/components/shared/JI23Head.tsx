import * as React from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { generateHeadParams } from '../../utils/GenerateUtils';

const JI23Head: React.FC = () => {
  const router = useRouter();
  const isBlog = router.pathname === 'blogs/[id]';
  const headParams = generateHeadParams(router);
  const { title, url, type } = headParams;

  const defaultTitle = 'JI23-DEV';
  const defaultDescription = '技術的なことをゆる〜く書くブログ兼ポートフォリオ';
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? '';

  return (
    <Head>
      {!isBlog && title && (
        <>
          <title>{`${title} | ${defaultTitle}`}</title>
          <meta name="Description" content={defaultDescription} />
          <meta property="og:title" content={`${title} | ${defaultTitle}`} />
          <meta property="og:description" content={defaultDescription} />
          <meta name="twitter:title" content={`${title} | ${defaultTitle}`} />
          <meta name="twitter:description" content={defaultDescription} />
          <meta
            property="og:image"
            content={`${baseUrl}/defaultOgpImage.png`}
          />
          <meta
            name="twitter:image"
            content={`${baseUrl}/defaultOgpImage.png`}
          />
        </>
      )}
      <meta property="og:site_name" content={defaultTitle} />
      <meta property="og:url" content={baseUrl + url} />
      <meta property="og:type" content={type} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@JJ_1123_I" />
      <meta name="twitter:url" content={baseUrl + url} />
      <link rel="canonical" href={baseUrl + url} />
    </Head>
  );
};

export default JI23Head;
