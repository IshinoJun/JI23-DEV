import React, { useCallback, useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Header from './Header';
import Footer from './Footer';
import JI23Head from './JI23Head';
import style from './Layout.module.scss';
import TopScrollButton from './TopScrollButton';

interface Props {
  children: React.ReactNode;
}

const Layout: React.FC<Props> = (props: Props) => {
  const { children } = props;
  const router = useRouter();
  const [isHidden, setHidden] = useState(true);
  const isTop = router.pathname === '/';

  const handleClickScrollTopButton = (): void => {
    document.scrollingElement?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleScroll = useCallback(() => {
    const posY = window.scrollY;
    const height = window.outerHeight; // 高さ

    if (posY > height) {
      setHidden(false);
    } else {
      setHidden(true);
    }
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll]);

  return (
    <>
      <JI23Head />
      <main className="wrapper">
        {!isTop ? (
          <Header />
        ) : (
          <header className={style.logo}>
            <Link href="/" as="/">
              <a>
                <img src="/logo.png" alt="ロゴ画像" />
              </a>
            </Link>
          </header>
        )}
        {children}
        <Footer />
        <div>
          <TopScrollButton
            onClickScrollTopButton={handleClickScrollTopButton}
            isHidden={isHidden}
          />
        </div>
      </main>
    </>
  );
};

export default Layout;
