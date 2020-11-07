import React from 'react';
import { NextPage, GetStaticProps } from 'next';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import style from './index.module.scss';

import Portfolio from '../../models/Portfolio';
import DevCMS from '../api/DevCMS';
import ArrayList from '../../models/Array';

import { formatEndMonth } from '../../utils/FormatUtils';
import IconButton from '../../components/shared/IconButton';
import IconButtonType from '../../enums/IconButtonType';

import Tags from '../../components/shared/Tags';

interface Props {
  portfolioAry: ArrayList<Portfolio>;
}

const PortfolioIndex: NextPage<Props> = (props: Props) => {
  const { portfolioAry } = props;

  return (
    <section className="padding-block border-bottom">
      <div className="container">
        {portfolioAry.contents.map((portfolio) => (
          <div className={style.content} key={portfolio.id}>
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
                <Tags
                  tags={portfolio.tags}
                  tagsPosition="left"
                  styleProps={{ marginBottom: 10 }}
                />
                {portfolio.introduction.split('\n').map((intro, index) => (
                  <p key={index}>{intro}</p>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export const getStaticProps: GetStaticProps = async (): Promise<{
  props: Props;
}> => {
  const devCMS = new DevCMS();

  const portfolioAry = await devCMS.getPortfolio();

  return {
    props: {
      portfolioAry,
    },
  };
};

export default PortfolioIndex;
