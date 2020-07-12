import React from "react";
import style from "./index.module.scss";

import { NextPage } from "next";
import HeaderProps from "../../models/HeaderProps";
import Layout from "../../components/shared/Layout";

const BlogIndex: NextPage = () => {
  const headerProps: HeaderProps = {
    title: "Blog",
    subTitle: "ブログ",
    linkProps: { href: "/" },
    imgProps: { src: "/blog.png", alt: "Blog" },
  } as const;

  return (
    <Layout title="Blog | dev-blog" headerProps={headerProps}>
      <section className="padding-block border-bottom">
        <div className="container">
          <div className={style.contact}></div>
        </div>
      </section>
    </Layout>
  );
};

export default BlogIndex;
