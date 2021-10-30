/* eslint-disable @next/next/no-img-element */
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useCallback, useEffect, useState } from 'react';
import { pagesPath } from '../../../utils/$path';
import { TopScrollButton } from '../button/TopScrollButton';
import { Footer } from '../footer/Footer';
import { JI23Head } from '../head/JI23Head';
import { Header } from '../header/Header';
import style from './Layout.module.scss';

interface Props {
  children: React.ReactNode;
}

export const Layout: React.FC<Props> = (props: Props) => {
  const { children } = props;
  const router = useRouter();
  const [isHidden, setHidden] = useState(true);
  const [isOpen, setIsOpen] = useState(false);

  const isTop = router.pathname === '/';

  const handleClickScrollTopButton = useCallback((): void => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }, []);

  const handleScroll = useCallback(() => {
    const posY = window.scrollY;
    const height = window.outerHeight; // 高さ

    if (posY > height) {
      setHidden(false);
    } else {
      setHidden(true);
    }
  }, []);

  const handleClickDrawer = useCallback(() => {
    if (isOpen) {
      setIsOpen(false);
    } else {
      setIsOpen(true);
    }
  }, [isOpen]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return (): void => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll]);

  return (
    <>
      <JI23Head />
      <div className='wrapper'>
        {!isTop ? (
          <Header onClickDrawer={handleClickDrawer} isOpen={isOpen} />
        ) : (
          <header className={style.logo}>
            <Link href={pagesPath.$url()}>
              <a>
                <img src='/logo.png' alt='ロゴ画像' />
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
      </div>
    </>
  );
};
