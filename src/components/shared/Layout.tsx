import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import HeaderProps from "../../models/HeaderProps";
import HeadProps from "../../models/HeadProps";
import JI23Head from "./JI23Head";

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
        {headerProps && <Header {...headerProps} />}
        {children}
        <Footer />
      </main>
    </>
  );
};

export default Layout;
