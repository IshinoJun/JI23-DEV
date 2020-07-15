import React from "react";
import style from "./index.module.scss";

import { NextPage, GetStaticProps } from "next";
import { Avatar } from "@material-ui/core";
import HomeContent from "../components/shared/HomeContent";
import Layout from "../components/shared/Layout";
import IconButton from "../components/shared/IconButton";
import IconButtonType from "../enums/IconButtonType";
import SNS from "../api/models/SNS";
import DevClient from "../api/DevClient";

interface Props {
  sns: SNS;
}

const Home: NextPage<Props> = (props: Props) => {
  const { sns } = props;

  return (
    <Layout title="Home | dev-blog">
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
              linkProps={{ href: "/blog" }}
              imgProps={{ src: "/blog.png", alt: "Blog" }}
              name="Blog"
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
              {/** TODO 良い感じの画像に差し替える */}
              <Avatar className={style.icon} src="" />
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

  const sns = await devClient.getMySNS();

  return {
    props: {
      sns,
    },
  };
};

export default Home;
