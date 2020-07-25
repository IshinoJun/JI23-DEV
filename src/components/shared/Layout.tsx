import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import HeaderProps from "../../models/HeaderProps";
import HeadProps from "../../models/HeadProps";
import JI23Head from "./JI23Head";
import Link from "next/link";
import style from "./Layout.module.scss";
import { useContextImageContext } from "../../context/ImageContext";

interface Props {
  children: React.ReactNode;
  headProps: HeadProps;
  headerProps?: HeaderProps;
}

const Layout: React.FC<Props> = (props: Props) => {
  const { children, headerProps, headProps } = props;

  const images = useContextImageContext();

  return (
    <>
      <JI23Head {...headProps} />
      <main className="wrapper">
        {headerProps ? (
          <Header {...headerProps} />
        ) : (
          <header className={style.logo}>
            <Link href="/" as={`/`}>
              <a>
                <img src={images.logoImage.url} />
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
