import React from "react";
import { NextPage } from "next";
import Layout from "../components/shared/Layout";
import HeadProps from "../models/HeadProps";
import { useRouter } from "next/router";
import style from "./_error.module.scss";
import Link from "next/link";

interface Props {
  statusCode: number;
}
const Error: NextPage<Props> = ({ statusCode }) => {
  const router = useRouter();

  const headProps: HeadProps = {
    title: "Error",
    type: "article",
    description: "JI23-DEVのエラーのページになります。",
    image: "",
    url: `${process.env.NEXT_PUBLIC_BASE_URL ?? ""}${router.asPath}`,
  } as const;

  return (
    <Layout headProps={headProps}>
      <div className={style.wrapper}>
        <header className={style.logo}>
          <Link href="/" as={`/`}>
            <a>
              <img src="/logo.png" />
            </a>
          </Link>
        </header>
        <section className="section">
          <div className="container">
            <div className={style.content}>
              <h1>{statusCode}</h1>
              <p>申し訳ありませんが、お探しのページは見つかりませんでした</p>
              <Link href="/" as={`/`}>
                <a>
                  <p>トップページへ</p>
                </a>
              </Link>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
};

Error.getInitialProps = ({ res, err }): Props => {
  const statusCode = res ? res.statusCode : err?.statusCode ?? 404;
  return { statusCode };
};

export default Error;
