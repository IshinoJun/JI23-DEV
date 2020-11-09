import React from 'react';
import { NextPage } from 'next';
import Head from 'next/head';
import Error from './_error';

const Custom404: NextPage = () => {
  return (
    <>
      <Head>
        <meta name="robots" content="noindex" />
      </Head>
      <Error statusCode={404} />
    </>
  );
};

export default Custom404;
