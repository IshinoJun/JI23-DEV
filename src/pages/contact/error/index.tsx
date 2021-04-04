import React from 'react';

import { NextPage, GetStaticProps } from 'next';
import { Button } from '@material-ui/core';
import Link from 'next/link';
import style from './index.module.scss';
import DevCMS from '../../api/DevCMS';
import SNS from '../../../models/SNS';
import { pagesPath } from '../../../utils/$path';

interface Props {
  sns: SNS;
}

const ErrorIndex: NextPage<Props> = (props: Props) => {
  const { sns } = props;

  return (
    <section className="padding-block border-bottom">
      <div className="container">
        <div className={style.contact}>
          <div>
            <h2>大変申し訳ありません、送信に失敗しました。</h2>
            <p>
              改めて、
              <Link href={pagesPath.contact.$url()}>
                <a className={style.formText}>問い合わせフォーム</a>
              </Link>
              からご連絡頂くか、
              <a
                href={sns.twitterUrl}
                target="_blank"
                rel="noreferrer"
                className={style.twitterText}
              >
                Twitter
              </a>
              でDMをお願い致します。
            </p>
          </div>
          <Button
            type="button"
            variant="contained"
            className={style.back}
            aria-label="ホームに戻る"
          >
            <Link href={pagesPath.$url()}>
              <a>ホームに戻る</a>
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export const getStaticProps: GetStaticProps = async (): Promise<{
  props: Props;
}> => {
  const devCMS = new DevCMS();

  const sns = await devCMS.getSNS();

  return {
    props: {
      sns,
    },
  };
};

export default ErrorIndex;
