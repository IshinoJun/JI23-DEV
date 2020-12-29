import React from 'react';
import { NextPage, GetStaticProps } from 'next';
import { Avatar } from '@material-ui/core';
import style from './index.module.scss';

import HomeContent from '../components/shared/HomeContent';
import IconButton from '../components/shared/IconButton';
import IconButtonType from '../enums/IconButtonType';
import SNS from '../models/SNS';
import DevCMS from './api/DevCMS';

interface Props {
  sns: SNS;
}

const Home: NextPage<Props> = (props: Props) => {
  const { sns } = props;

  const IMAGE_WIDTH = 100 as const;
  const IMAGE_HEIGHT = 120 as const;

  return (
    <>
      <nav className={style.nav}>
        <div className="container">
          <div className={style.contents}>
            <HomeContent
              linkProps={{ href: '/profile' }}
              imgProps={{
                src: '/profile.png',
                alt: 'Profile',
                width: IMAGE_WIDTH,
                height: IMAGE_HEIGHT,
              }}
              name="Profile"
            />
            <HomeContent
              linkProps={{ href: '/portfolio' }}
              imgProps={{
                src: '/portfolio.png',
                alt: 'Portfolio',
                width: IMAGE_WIDTH,
                height: IMAGE_HEIGHT,
              }}
              name="Portfolio"
            />
            <HomeContent
              linkProps={{ href: '/blogs' }}
              imgProps={{
                src: '/blog.png',
                alt: 'Blogs',
                width: IMAGE_WIDTH,
                height: IMAGE_HEIGHT,
              }}
              name="Blogs"
            />
            <HomeContent
              linkProps={{ href: '/contact' }}
              imgProps={{
                src: '/contact.png',
                alt: 'Contact',
                width: IMAGE_WIDTH,
                height: IMAGE_HEIGHT,
              }}
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
              <h2>Web Developer</h2>
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
                <IconButton
                  iconButtonType={IconButtonType.zenn}
                  href={sns.zennUrl}
                  ariaLabel="zennのリンク"
                />
              </div>
            </div>
            <div className={style.iconArea}>
              <Avatar className={style.icon} src="/icon.png" alt="ロゴ画像" />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export const getStaticProps: GetStaticProps = async (): Promise<{
  props: Props;
}> => {
  const devCMS = new DevCMS();

  const sns = await devCMS.getSNS();

  return {
    props: {
      sns,
    },
  };
};

export default Home;
