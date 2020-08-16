import React from "react";
import style from "./index.module.scss";

import { NextPage, GetStaticProps } from "next";
import Layout from "../../../components/shared/Layout";
import { Button } from "@material-ui/core";
import Link from "next/link";
import HeaderProps from "../../../models/HeaderProps";
import { useRouter } from "next/router";
import HeadProps from "../../../models/HeadProps";
import DevCMS from "../../api/DevCMS";
import SNS from "../../../models/SNS";

interface Props {
  sns: SNS;
}

const ErrorIndex: NextPage<Props> = (props: Props) => {
  const { sns } = props;
  const router = useRouter();

  const headerProps: HeaderProps = {
    title: "Contact",
    subTitle: "お問い合わせ",
    linkProps: { href: "/" },
    imgProps: { src: "/contact.png", alt: "Contact" },
  } as const;

  const headProps: HeadProps = {
    title: "Error",
    type: "article",
    url: `${router.asPath}`,
  } as const;

  return (
    <Layout headProps={headProps} headerProps={headerProps}>
      <section className="padding-block border-bottom">
        <div className="container">
          <div className={style.contact}>
            <div>
              <h2>大変申し訳ありません、送信に失敗しました。</h2>
              <p>
                改めて、
                <Link href="/contact" as={`/contact`}>
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
              <Link href="/" as={`/`}>
                <a>ホームに戻る</a>
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
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
