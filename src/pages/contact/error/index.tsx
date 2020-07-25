import React from "react";
import style from "./index.module.scss";

import { NextPage, GetStaticProps } from "next";
import Layout from "../../../components/shared/Layout";
import { Button } from "@material-ui/core";
import Link from "next/link";
import HeaderProps from "../../../models/HeaderProps";
import { useRouter } from "next/router";
import HeadProps from "../../../models/HeadProps";
import DevClient from "../../api/DevClient";
import SNS from "../../../models/SNS";
import { useContextImageContext } from "../../../context/ImageContext";

interface Props {
  sns: SNS;
}

const ErrorIndex: NextPage<Props> = (props: Props) => {
  const { sns } = props;
  const router = useRouter();

  const images = useContextImageContext();

  const headerProps: HeaderProps = {
    title: "Contact",
    subTitle: "お問い合わせ",
    linkProps: { href: "/" },
    imgProps: { src: images.contactImage.url, alt: "Contact" },
  } as const;

  const headProps: HeadProps = {
    title: "Contact",
    type: "article",
    description: "JI23-DEVの問い合わせのページになります。",
    image: images.contactImage.url,
    url: `${process.env.NEXT_PUBLIC_BASE_URL ?? ""}${router.asPath}`,
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
  const devClient = new DevClient();

  const sns = await devClient.getSNS();

  return {
    props: {
      sns,
    },
  };
};

export default ErrorIndex;
