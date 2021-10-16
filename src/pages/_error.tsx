import { NextPage } from 'next';
import Link from 'next/link';
import React from 'react';
import { pagesPath } from '../utils/$path';
import style from './_error.module.scss';

interface Props {
  statusCode: number;
}
const Error: NextPage<Props> = ({ statusCode }) => {
  return (
    <div className={style.wrapper}>
      <section className='section'>
        <div className='container'>
          <div className={style.content}>
            <h1>{statusCode}</h1>
            <p>申し訳ありませんが、お探しのページは見つかりませんでした</p>
            <Link href={pagesPath.$url()}>
              <a>トップページへ</a>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

Error.getInitialProps = ({ res, err }): Props => {
  const statusCode = res ? res.statusCode : err?.statusCode ?? 404;

  return { statusCode };
};

export default Error;
