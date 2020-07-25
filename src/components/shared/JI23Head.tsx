import * as React from "react";
import Head from "next/head";
import HeadProps from "../../models/HeadProps";

const JI23Head: React.FC<HeadProps> = (props: HeadProps) => {
  const { title, description, image, url, type } = props;

  const defaultTitle = "JI23-DEV";
  const defaultDescription = "技術的なことをゆる〜く書くブログ兼ポートフォリオ";

  return (
    <Head>
      <title>{`${title} | ${defaultTitle}`}</title>
      <meta name="Description" content={description} />
      <meta
        property="og:url"
        content={url ?? process.env.NEXT_PUBLIC_BASE_URL}
      />
      <meta property="og:type" content={type} />
      <meta property="og:title" content={`${title} | ${defaultTitle}`} />
      <meta
        property="og:description"
        content={description ?? defaultDescription}
      />
      <meta property="og:site_name" content={defaultTitle} />
      <meta
        property="og:image"
        content={image ?? process.env.NEXT_PUBLIC_DEFAULT_IMAGE_URL}
      />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@JJ_1123_I" />
      <meta
        name="twitter:url"
        content={url ?? process.env.NEXT_PUBLIC_BASE_URL}
      />
      <meta name="twitter:title" content={`${title} | ${defaultTitle}`} />
      <meta
        name="twitter:description"
        content={description ?? defaultDescription}
      />
      <meta
        name="twitter:image"
        content={image ?? process.env.NEXT_PUBLIC_DEFAULT_IMAGE_URL}
      />
      <link rel="canonical" href={url ?? process.env.NEXT_PUBLIC_BASE_URL} />
    </Head>
  );
};

export default JI23Head;
