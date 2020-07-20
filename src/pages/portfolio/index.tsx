import React from "react";
import style from "./index.module.scss";

import { NextPage, GetStaticProps } from "next";
import HeaderProps from "../../models/HeaderProps";
import Layout from "../../components/shared/Layout";
import Portfolio from "../../models/Portfolio";
import DevClient from "../../pages/api/DevClient";
import ArrayList from "../../models/Array";

import { formatEndMonth } from "../../utils/FormatUtils";
import IconButton from "../../components/shared/IconButton";
import IconButtonType from "../../enums/IconButtonType";

interface Props {
  portfolioAry: ArrayList<Portfolio>;
}

const PortfolioIndex: NextPage<Props> = (props: Props) => {
  const { portfolioAry } = props;

  const headerProps: HeaderProps = {
    title: "Portfolio",
    subTitle: "ポートフォリオ",
    linkProps: { href: "/" },
    imgProps: { src: "/portfolio.png", alt: "Portfolio" },
  } as const;

  return (
    <Layout title="Portfolio" headerProps={headerProps}>
      <section className="padding-block border-bottom">
        <div className="container">
          {portfolioAry.contents.map((portfolio, index) => (
            <div className={style.content} key={index}>
              <div className={style.portfolio}>
                <div className={style.photo}>
                  <img src={portfolio.image.url} alt={portfolio.name} />
                  <div className={style.linkArea}>
                    <IconButton
                      iconButtonType={IconButtonType.siteLink}
                      href={portfolio.siteLink}
                    />
                    <IconButton
                      iconButtonType={IconButtonType.gitHub}
                      href={portfolio.githubLink}
                    />
                  </div>
                </div>
                <div className={style.detail}>
                  <h2>{portfolio.name}</h2>
                  <p>{formatEndMonth(new Date(portfolio.date))}</p>
                  {portfolio.introduction.split("\n").map((intro, index) => (
                    <p key={index}>{intro}</p>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </Layout>
  );
};

export const getStaticProps: GetStaticProps = async (): Promise<{
  props: Props;
}> => {
  const devClient = new DevClient();

  const portfolioAry = await devClient.getPortfolio();

  return {
    props: {
      portfolioAry,
    },
  };
};

export default PortfolioIndex;
