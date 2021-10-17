import AccessTimeIcon from '@material-ui/icons/AccessTime';
import { GetStaticProps, NextPage } from 'next';
import Image from 'next/image';
import React from 'react';
import { DevCMS } from '../../clients';
import { IconButton } from '../../components/common/button/IconButton';
import { Tags } from '../../components/common/tag/Tags';
import { IconButtonType } from '../../enums';
import { List, Portfolio } from '../../models';
import { formatEndMonth } from '../../utils/FormatUtils';
import style from './index.module.scss';

interface Props {
  portfolioAry: List<Portfolio>;
}

const PortfolioIndex: NextPage<Props> = (props: Props) => {
  const { portfolioAry } = props;

  return (
    <section className='padding-block border-bottom'>
      <div className='container'>
        {portfolioAry.contents.map((portfolio) => (
          <div className={style.content} key={portfolio.id}>
            <div className={style.portfolio}>
              <div className={style.photo}>
                <Image
                  src={portfolio.image.url}
                  alt='ポートフォリオの画像'
                  width={432}
                  height={300}
                />
                <div className={style.linkArea}>
                  <IconButton
                    iconButtonType={IconButtonType.siteLink}
                    href={portfolio.siteLink}
                    ariaLabel='サイトのリンク'
                  />
                  <IconButton
                    iconButtonType={IconButtonType.gitHub}
                    href={portfolio.githubLink}
                    ariaLabel='twitterのリンク'
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
                  tagsPosition='left'
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
