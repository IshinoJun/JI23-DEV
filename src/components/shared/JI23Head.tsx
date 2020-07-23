import * as React from "react";
import Head from "next/head";
import HeadProps from "../../models/HeadProps";

const JI23Head: React.FC<HeadProps> = (props: HeadProps) => {
  const { title, description, image, url, type } = props;

  return (
    <Head>
      <title>{title + " | JI23-Dev"}</title>
      <meta property="og:url" content={url} />
      <meta property="og:type" content={type} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:site_name" content={title} />
      <meta property="og:image" content={image} />
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:site" content="@JJ_1123_I" />
      <meta name="twitter:url" content={image} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      <link rel="canonical" href={url} />
    </Head>
  );
};

export default JI23Head;
