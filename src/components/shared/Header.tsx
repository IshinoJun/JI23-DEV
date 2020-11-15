import React from 'react';
import Link from 'next/link';
import { IconButton } from '@material-ui/core';
import { useRouter } from 'next/router';
import MenuIcon from '@material-ui/icons/Menu';

import { generateHeaderParams } from '../../utils/GenerateUtils';
import style from './Header.module.scss';
import HeaderDrawer from './HeaderDrawer';
import useMedia from '../../hooks/useMedia';
import GlobalNav from '../../models/GlobalNav';

interface Props {
  isOpen: boolean;
  onClickDrawer: () => void;
}

const Header: React.FC<Props> = (props) => {
  const { isOpen, onClickDrawer } = props;
  const router = useRouter();
  const [hasMounted, setHasMounted] = React.useState(false);
  const isPc = useMedia('pc');
  const headerParams = generateHeaderParams(router);

  const { title, subTitle, imgProps } = headerParams;

  const globalNav: GlobalNav[] = [
    {
      title: 'Home',
      subTitle: 'ホーム',
      linkProps: { href: '/' },
      imgProps: { src: '/icon.png', alt: 'Home' },
    },
    {
      title: 'Profile',
      subTitle: 'プロフィール',
      linkProps: { href: '/profile' },
      imgProps: { src: '/profile.png', alt: 'Profile' },
    },
    {
      title: 'Portfolio',
      subTitle: 'ポートフォリオ',
      linkProps: { href: '/portfolio' },
      imgProps: { src: '/portfolio.png', alt: 'Portfolio' },
    },
    {
      title: 'Blogs',
      subTitle: 'ブログ一覧',
      linkProps: { href: '/blogs' },
      imgProps: { src: '/blog.png', alt: 'Blogs' },
    },
    {
      title: 'Contact',
      subTitle: 'お問い合わせ',
      linkProps: { href: '/contact' },
      imgProps: { src: '/contact.png', alt: 'Contact' },
    },
  ];

  React.useEffect(() => {
    setHasMounted(true);
  }, []);

  // FIXME: マウント後にやらないとSSRのエラーが出るのでその対策
  if (!hasMounted) {
    return null;
  }

  return (
    <>
      <header className={style.head}>
        <div className="container">
          <div className={style.row}>
            <div className={style.titleArea}>
              <div className={style.icon}>
                <img {...imgProps} alt="ヘッダー画像" />
              </div>
              <div className={style.title}>
                <h2>{title}</h2>
                <h3>{subTitle}</h3>
              </div>
            </div>
            {isPc ? (
              <nav className={style.globalNav}>
                <ul>
                  {globalNav.map((nav) => (
                    <li key={nav.title}>
                      <Link href={nav.linkProps.href}>{nav.title}</Link>
                    </li>
                  ))}
                </ul>
              </nav>
            ) : (
              <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="end"
                onClick={onClickDrawer}
              >
                <MenuIcon />
              </IconButton>
            )}
          </div>
        </div>
      </header>
      <div className={style.logo}>
        <Link href="/" as="/">
          <a href="/">
            <img src="/logo.png" alt="ロゴ画像" />
          </a>
        </Link>
      </div>
      <HeaderDrawer
        isOpen={isOpen}
        onClickDrawer={onClickDrawer}
        globalNav={globalNav}
      />
    </>
  );
};

export default Header;
