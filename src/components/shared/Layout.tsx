import React from "react";
import Head from "next/head";
import Header from "./Header";
import Footer from "./Footer";
import HeaderProps from "../../models/HeaderProps";

interface Props {
  title: string;
  children: React.ReactNode;
  headerProps?: HeaderProps;
}

const Layout: React.FC<Props> = (props: Props) => {
  const { title, children, headerProps } = props;

  return (
    <>
      <Head>
        <title>{title + " | dev-blog"}</title>
      </Head>
      <main className="wrapper">
        {headerProps && <Header {...headerProps} />}
        {children}
        <Footer />
      </main>
    </>
  );
};

export default Layout;
