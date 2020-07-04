import React from "react";
import index from "./index.module.scss";

import { NextPage } from "next";
import { Avatar, Button } from "@material-ui/core";
import TwitterIcon from "@material-ui/icons/Twitter";
import GitHubIcon from "@material-ui/icons/GitHub";

const Home: NextPage = () => {
  return (
    <main className={index.wrapper}>
      <nav className={index.nav}>
        <div className={index.container}>
          <div className={index.contents}>
            <a className={index.content}>
              <div className={index.before}>
                <p>
                  <img src="/profile.png" alt="Profile" />
                </p>
              </div>
              <span className={index.after}>Profile</span>
            </a>
            <a className={index.content}>
              <span className={index.before}>
                <img src="/portfolio.png" alt="Portfolio" />
              </span>
              <span className={index.after}>Portfolio</span>
            </a>
            <a className={index.content}>
              <span className={index.before}>
                <img src="/blog.png" alt="Blog" />
              </span>
              <span className={index.after}>Blog</span>
            </a>
            <a className={index.content}>
              <span className={index.before}>
                <img src="/contact.png" alt="Contact" />
              </span>
              <span className={index.after}>Contact</span>
            </a>
          </div>
        </div>
      </nav>
      <section className={index.section}>
        <div className={index.container}>
          <div className={index.profile}>
            <div className={index.titleArea}>
              <h1 className={index.title}>JUN ISHINO</h1>
              <h3>Web Developer</h3>
              <div className={index.linkArea}>
                <Button
                  variant="contained"
                  className={index.twitter}
                  href="https://twitter.com/JJ_1123_I"
                  target="_blank"
                >
                  <TwitterIcon />
                </Button>
                <Button
                  variant="contained"
                  className={index.github}
                  href="https://github.com/IshinoJun"
                  target="_blank"
                >
                  <GitHubIcon />
                </Button>
              </div>
            </div>
            <div className={index.iconArea}>
              <Avatar className={index.icon} src="/test.jpeg" />
            </div>
          </div>
        </div>
      </section>
      <footer>
        <div className={index.container}>
          <div className={index.footerContent}>
            <span>
              Jun Ishino {new Date().getFullYear()} All right reserved
            </span>
          </div>
        </div>
      </footer>
    </main>
  );
};
export default Home;
