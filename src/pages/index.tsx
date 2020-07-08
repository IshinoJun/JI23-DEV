import React from "react";
import style from "./index.module.scss";

import { NextPage } from "next";
import { Avatar, Button } from "@material-ui/core";
import TwitterIcon from "@material-ui/icons/Twitter";
import GitHubIcon from "@material-ui/icons/GitHub";
import Footer from "../components/shared/Footer";
import HomeContent from "../components/shared/HomeContent";

const Home: NextPage = () => {
  return (
    <main className="wrapper">
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
      <section className={style.section}>
        <div className="container">
          <div className={style.profile}>
            <div className={style.titleArea}>
              <h1 className={style.title}>JUN ISHINO</h1>
              <h3>Web Developer</h3>
              <div className={style.linkArea}>
                <Button
                  variant="contained"
                  className={style.twitter}
                  href="https://twitter.com/JJ_1123_I"
                  target="_blank"
                >
                  <TwitterIcon />
                </Button>
                <Button
                  variant="contained"
                  className={style.github}
                  href="https://github.com/IshinoJun"
                  target="_blank"
                >
                  <GitHubIcon />
                </Button>
              </div>
            </div>
            <div className={style.iconArea}>
              {/** TODO 良い感じの画像に差し替える */}
              <Avatar className={style.icon} src="" />
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
};
export default Home;
