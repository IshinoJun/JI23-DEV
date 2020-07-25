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
import { useRouter } from "next/router";
import HeadProps from "../../models/HeadProps";
import Tags from "../../components/shared/Tags";
import AccessTimeIcon from "@material-ui/icons/AccessTime";
import { useContextImageContext } from "../../context/ImageContext";

interface Props {
  portfolioAry: ArrayList<Portfolio>;
}

const PortfolioIndex: NextPage<Props> = (props: Props) => {
  const { portfolioAry } = props;
  const router = useRouter();

  const images = useContextImageContext();

  const headerProps: HeaderProps = {
    title: "Portfolio",
    subTitle: "ポートフォリオ",
    linkProps: { href: "/" },
    imgProps: { src: images.portfolioImage.url, alt: "Portfolio" },
  } as const;

  const headProps: HeadProps = {
    title: "Portfolio",
    type: "article",
    description: "JI23-DEVのポートフォリオのページになります。",
    image: images.portfolioImage.url,
    url: `${process.env.NEXT_PUBLIC_BASE_URL ?? ""}${router.asPath}`,
  } as const;

  return (
    <Layout headProps={headProps} headerProps={headerProps}>
      <section className="padding-block border-bottom">
        <div className="container">
          {portfolioAry.contents.map((portfolio, index) => (
            <div className={style.content} key={index}>
              <div className={style.portfolio}>
                <div className={style.photo}>
                  <img src={portfolio.image.url} alt="ポートフォリオの画像" />
                  <div className={style.linkArea}>
                    <IconButton
                      iconButtonType={IconButtonType.siteLink}
                      href={portfolio.siteLink}
                      ariaLabel="サイトのリンク"
                    />
                    <IconButton
                      iconButtonType={IconButtonType.gitHub}
                      href={portfolio.githubLink}
                      ariaLabel="twitterのリンク"
                    />
                  </div>
                </div>
                <div className={style.detail}>
                  <h2>{portfolio.name}</h2>
                  <p className={style.date}>
                    <AccessTimeIcon />
                    <span>{formatEndMonth(new Date(portfolio.date))}</span>
                  </p>
                  <Tags tags={portfolio.tags} tagsPosition="left" />
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
