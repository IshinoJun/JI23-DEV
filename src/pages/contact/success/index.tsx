import React from "react";
import style from "./index.module.scss";

import { NextPage } from "next";
import Layout from "../../../components/shared/Layout";
import { Button } from "@material-ui/core";
import Link from "next/link";
import HeaderProps from "../../../models/HeaderProps";
import useMedia from "../../../hooks/useMedia";
import { useRouter } from "next/router";
import HeadProps from "../../../models/HeadProps";
import { useContextImageContext } from "../../../context/ImageContext";

const SuccessIndex: NextPage = () => {
  const isTab = useMedia("tab");

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
              {isTab ? (
                <h2>お問い合わせありがとうございます</h2>
              ) : (
                <h2>
                  お問い合わせ
                  <br />
                  ありがとうございます
                </h2>
              )}
              <p>ご記入頂いた情報は無事に送信されました</p>
              <p>数日中にご返信致しますので少々お待ちください</p>
            </div>
            <Button type="button" variant="contained" className={style.back}>
              <Link href="/">
                <a>ホームに戻る</a>
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default SuccessIndex;
