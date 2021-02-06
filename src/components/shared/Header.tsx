import React from 'react';
import Link from 'next/link';
import { IconButton } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';

import Image from 'next/image';
import Sticky from 'react-stickynode';
import { useRouter } from 'next/router';
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
  const [hasMounted, setHasMounted] = React.useState(false);
  const isPc = useMedia('pc');
  const router = useRouter();

  const globalNav: GlobalNav[] = [
    {
      title: 'home',
      subTitle: 'ホーム',
      linkProps: { href: '/' },
    },
    {
      title: 'profile',
      subTitle: 'プロフィール',
      linkProps: { href: '/profile' },
    },
    {
      title: 'portfolio',
      subTitle: 'ポートフォリオ',
      linkProps: { href: '/portfolio' },
    },
    {
      title: 'blogs',
      subTitle: 'ブログ一覧',
      linkProps: { href: '/blogs' },
    },
    {
      title: 'contact',
      subTitle: 'お問い合わせ',
      linkProps: { href: '/contact' },
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
      <Sticky innerZ={10}>
        <header className={style.head}>
          <div className="container">
            <div className={style.row}>
              <div className={style.titleArea}>
                <div className={style.icon}>
                  <Link href="/">
                    <a className={style.link}>
                      <Image
                        src="/logo.png"
                        alt="ロゴ画像"
                        width={192}
                        height={48}
                      />
                    </a>
                  </Link>
                </div>
              </div>
              {isPc ? (
                <nav className={style.globalNav}>
                  <ul>
                    {globalNav.map((nav) => (
                      <li
                        key={nav.title}
                        className={style.title}
                        data-is-select={router.asPath.includes(nav.title)}
                      >
                        <Link href={nav.linkProps.href}>
                          <a>{nav.title}</a>
                        </Link>
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
      </Sticky>
      <HeaderDrawer
        isOpen={isOpen}
        onClickDrawer={onClickDrawer}
        globalNav={globalNav}
      />
    </>
  );
};

export default Header;
