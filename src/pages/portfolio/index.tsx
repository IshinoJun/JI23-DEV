import React from "react";
import style from "./index.module.scss";

import { NextPage } from "next";
import HeaderProps from "../../models/HeaderProps";
import Layout from "../../components/shared/Layout";

const PortfolioIndex: NextPage = () => {
  const headerProps: HeaderProps = {
    title: "Portfolio",
    subTitle: "ポートフォリオ",
    linkProps: { href: "/" },
    imgProps: { src: "/portfolio.png", alt: "Portfolio" },
  } as const;

  return (
    <Layout title="Portfolio | dev-blog" headerProps={headerProps}>
      <section className="padding-block border-bottom">
        <div className="container">
          <div className={style.contact}></div>
        </div>
      </section>
    </Layout>
  );
};

export default PortfolioIndex;
