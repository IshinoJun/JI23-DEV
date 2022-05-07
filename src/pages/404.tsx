import { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import React from 'react';
import { pagesPath } from '../utils/$path';
import style from './404.module.scss';

const Custom404: NextPage = () => {
  return (
    <>
      <Head>
        <meta name='robots' content='noindex' />
      </Head>
      <div className={style.wrapper}>
        <section className='section'>
          <div className='container'>
            <div className={style.content}>
              <h1>{404}</h1>
              <p>申し訳ありませんが、お探しのページは見つかりませんでした</p>
              <Link href={pagesPath.$url()}>
                <a>トップページへ</a>
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Custom404;
