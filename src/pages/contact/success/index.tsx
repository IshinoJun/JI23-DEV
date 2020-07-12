import React from "react";
import style from "./index.module.scss";

import { NextPage } from "next";
import Layout from "../../../components/shared/Layout";
import { Button } from "@material-ui/core";
import Link from "next/link";
import HeaderProps from "../../../models/HeaderProps";
import useMedia from "../../../hooks/useMedia";

const SuccessIndex: NextPage = () => {
  const isTab = useMedia("tab");

  const headerProps: HeaderProps = {
    title: "Contact",
    subTitle: "お問い合わせ",
    linkProps: { href: "/" },
    imgProps: { src: "/contact.png", alt: "Contact" },
  } as const;

  return (
    <Layout title="ContactSuccess | dev-blog" headerProps={headerProps}>
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
