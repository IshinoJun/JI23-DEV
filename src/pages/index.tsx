import React from "react";
import style from "./index.module.scss";

import { NextPage, GetStaticProps } from "next";
import { Avatar } from "@material-ui/core";
import HomeContent from "../components/shared/HomeContent";
import Layout from "../components/shared/Layout";
import IconButton from "../components/shared/IconButton";
import IconButtonType from "../enums/IconButtonType";
import SNS from "../models/SNS";
import DevClient from "../pages/api/DevClient";
import HeadProps from "../models/HeadProps";
import { useRouter } from "next/router";
import { useContextImageContext } from "../context/ImageContext";

interface Props {
  sns: SNS;
}

const HomeIndex: NextPage<Props> = (props: Props) => {
  const { sns } = props;
  const router = useRouter();

  const images = useContextImageContext();

  const headProps: HeadProps = {
    type: "website",
    url: `${process.env.NEXT_PUBLIC_BASE_URL ?? ""}${router.asPath}`,
  } as const;

  return (
    <Layout headProps={headProps}>
      <nav className={style.nav}>
        <div className="container">
          <div className={style.contents}>
            <HomeContent
              linkProps={{ href: "/profile" }}
              imgProps={{ src: images.profileImage.url, alt: "Profile" }}
              name="Profile"
            />
            <HomeContent
              linkProps={{ href: "/portfolio" }}
              imgProps={{ src: images.portfolioImage.url, alt: "Portfolio" }}
              name="Portfolio"
            />
            <HomeContent
              linkProps={{ href: "/blogs" }}
              imgProps={{ src: images.blogImage.url, alt: "Blogs" }}
              name="Blogs"
            />
            <HomeContent
              linkProps={{ href: "/contact" }}
              imgProps={{ src: images.contactImage.url, alt: "Contact" }}
              name="Contact"
            />
          </div>
        </div>
      </nav>
      <section className="section">
        <div className="container">
          <div className={style.profile}>
            <div className={style.titleArea}>
              <h1 className={style.title}>Jun Ishino</h1>
              <h2>Web Develope</h2>
              <div className={style.linkArea}>
                <IconButton
                  iconButtonType={IconButtonType.twitter}
                  href={sns.twitterUrl}
                  ariaLabel="twitterのリンク"
                />
                <IconButton
                  iconButtonType={IconButtonType.gitHub}
                  href={sns.gitHubUrl}
                  ariaLabel="gitHubのリンク"
                />
              </div>
            </div>
            <div className={style.iconArea}>
              <Avatar
                className={style.icon}
                src={images.iconImage.url}
                alt="ロゴ画像"
              />
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

export default HomeIndex;
