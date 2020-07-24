import React from "react";
import style from "./index.module.scss";

import { NextPage, GetStaticProps } from "next";
import { Avatar } from "@material-ui/core";
import HomeContent from "../components/shared/HomeContent";
import Layout from "../components/shared/Layout";
import IconButton from "../components/shared/IconButton";
import IconButtonType from "../enums/IconButtonType";
import SNS from "../models/SNS";
import Home from "../models/Home";
import DevClient from "../pages/api/DevClient";
import HeadProps from "../models/HeadProps";
import { useRouter } from "next/router";

interface Props {
  sns: SNS;
  home: Home;
}

const HomeIndex: NextPage<Props> = (props: Props) => {
  const { sns, home } = props;
  const router = useRouter();

  const headProps: HeadProps = {
    title: "Home",
    type: "website",
    description: "JI23-DEV/ブログ兼ブログになります。",
    image: home.iconImage.url,
    url: `${process.env.NEXT_PUBLIC_BASE_URL ?? ""}${router.asPath}`,
  } as const;

  return (
    <Layout headProps={headProps}>
      <nav className={style.nav}>
        <div className="container">
          <div className={style.contents}>
            <HomeContent
              linkProps={{ href: "/profile" }}
              imgProps={{ src: home.profileImage.url, alt: "Profile" }}
              name="Profile"
            />
            <HomeContent
              linkProps={{ href: "/portfolio" }}
              imgProps={{ src: home.portfolioImage.url, alt: "Portfolio" }}
              name="Portfolio"
            />
            <HomeContent
              linkProps={{ href: "/blogs" }}
              imgProps={{ src: home.blogsImage.url, alt: "Blogs" }}
              name="Blogs"
            />
            <HomeContent
              linkProps={{ href: "/contact" }}
              imgProps={{ src: home.contactImage.url, alt: "Contact" }}
              name="Contact"
            />
          </div>
        </div>
      </nav>
      <section className="section">
        <div className="container">
          <div className={style.profile}>
            <div className={style.titleArea}>
              <h1 className={style.title}>{home.name}</h1>
              <h3>{home.profession}</h3>
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
              <Avatar className={style.icon} src={home.iconImage.url} />
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
  const home = await devClient.getHome();

  return {
    props: {
      sns,
      home,
    },
  };
};

export default HomeIndex;
