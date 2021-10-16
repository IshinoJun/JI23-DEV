import { Avatar } from '@material-ui/core';
import { GetStaticProps, NextPage } from 'next';
import React from 'react';
import HomeContent from '../components/shared/HomeContent';
import IconButton from '../components/shared/IconButton';
import IconButtonType from '../enums/IconButtonType';
import SNS from '../models/SNS';
import DevCMS from './api/DevCMS';
import style from './index.module.scss';

interface Props {
  sns: SNS;
}

const Home: NextPage<Props> = (props: Props) => {
  const { sns } = props;

  return (
    <>
      <nav className={style.nav}>
        <div className='container'>
          <div className={style.contents}>
            <HomeContent
              linkProps={{ href: '/profile' }}
              imgProps={{
                src: '/profile.png',
                alt: 'Profile',
                width: 109,
                height: 128,
              }}
              name='Profile'
            />
            <HomeContent
              linkProps={{ href: '/portfolio' }}
              imgProps={{
                src: '/portfolio.png',
                alt: 'Portfolio',
                width: 128,
                height: 107,
              }}
              name='Portfolio'
            />
            <HomeContent
              linkProps={{ href: '/blogs' }}
              imgProps={{
                src: '/blog.png',
                alt: 'Blogs',
                width: 129,
                height: 124,
              }}
              name='Blogs'
            />
            <HomeContent
              linkProps={{ href: '/contact' }}
              imgProps={{
                src: '/contact.png',
                alt: 'Contact',
                width: 93,
                height: 128,
              }}
              name='Contact'
            />
          </div>
        </div>
      </nav>
      <section className='section'>
        <div className='container'>
          <div className={style.profile}>
            <div className={style.titleArea}>
              <h1 className={style.title}>Jun Ishino</h1>
              <h2>Web Developer</h2>
              <div className={style.linkArea}>
                <IconButton
                  iconButtonType={IconButtonType.twitter}
                  href={sns.twitterUrl}
                  ariaLabel='twitterのリンク'
                />
                <IconButton
                  iconButtonType={IconButtonType.gitHub}
                  href={sns.gitHubUrl}
                  ariaLabel='gitHubのリンク'
                />
                <IconButton
                  iconButtonType={IconButtonType.zenn}
                  href={sns.zennUrl}
                  ariaLabel='zennのリンク'
                />
              </div>
            </div>
            <div className={style.iconArea}>
              <Avatar className={style.icon} src='/myIcon.png' alt='ロゴ画像' />
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
