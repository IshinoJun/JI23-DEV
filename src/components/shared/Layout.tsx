import React from 'react';
import Link from 'next/link';
import Header from './Header';
import Footer from './Footer';
import HeaderProps from '../../models/HeaderProps';
import HeadProps from '../../models/HeadProps';
import JI23Head from './JI23Head';
import style from './Layout.module.scss';

interface Props {
  children: React.ReactNode;
  headProps: HeadProps;
  headerProps?: HeaderProps;
}

const Layout: React.FC<Props> = (props: Props) => {
  const { children, headerProps, headProps } = props;

  return (
    <>
      <JI23Head {...headProps} />
      <main className="wrapper">
        {headerProps ? (
          <Header {...headerProps} />
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
      </main>
    </>
  );
};

export default Layout;
