import React from "react";
import style from "./index.module.scss";

import { NextPage, GetStaticProps } from "next";
import Link from "next/link";
import { Avatar } from "@material-ui/core";
import HomeContent from "../components/shared/HomeContent";
import Layout from "../components/shared/Layout";
import IconButton from "../components/shared/IconButton";
import IconButtonType from "../enums/IconButtonType";
import SNS from "../models/SNS";
import DevClient from "../pages/api/DevClient";
import HeadProps from "../models/HeadProps";
import { useRouter } from "next/router";

interface Props {
  sns: SNS;
}

const Home: NextPage<Props> = (props: Props) => {
  const { sns } = props;
  const router = useRouter();

  //TODO:なんか説明と画像を用意する
  const headProps: HeadProps = {
    title: "Home",
    type: "website",
    description: "JI23-DEVのホームのページになります。",
    image: "",
    url: `${process.env.NEXT_PUBLIC_BASE_URL ?? ""}${router.asPath}`,
  } as const;

  return (
    <Layout headProps={headProps}>
      <header className={style.logo}>
        <Link href="/" as={`/`}>
          <a>
            <img src="/logo.png" />
          </a>
        </Link>
      </header>
      <nav className={style.nav}>
        <div className="container">
          <div className={style.contents}>
            <HomeContent
              linkProps={{ href: "/profile" }}
              imgProps={{ src: "/profile.png", alt: "Profile" }}
              name="Profile"
            />
            <HomeContent
              linkProps={{ href: "/portfolio" }}
              imgProps={{ src: "/portfolio.png", alt: "Portfolio" }}
              name="Portfolio"
            />
            <HomeContent
              linkProps={{ href: "/blogs" }}
              imgProps={{ src: "/blog.png", alt: "Blogs" }}
              name="Blogs"
            />
            <HomeContent
              linkProps={{ href: "/contact" }}
              imgProps={{ src: "/contact.png", alt: "Contact" }}
              name="Contact"
            />
          </div>
        </div>
      </nav>
      <section className="section">
        <div className="container">
          <div className={style.profile}>
            <div className={style.titleArea}>
              <h1 className={style.title}>JUN ISHINO</h1>
              <h3>Web Developer</h3>
              <div className={style.linkArea}>
                <IconButton
                  iconButtonType={IconButtonType.twitter}
                  href={sns.twitterUrl}
                />
                <IconButton
                  iconButtonType={IconButtonType.gitHub}
                  href={sns.gitHubUrl}
                />
              </div>
            </div>
            <div className={style.iconArea}>
              <Avatar className={style.icon} src="/icon.png" />
            </div>
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

export default Home;
