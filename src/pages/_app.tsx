import React, { useEffect } from "react";
import { ThemeProvider } from "@material-ui/core/styles";
import theme from "../components/theme";
import { AppProps } from "next/app";
import "ress";
import "../../styles.scss";
import "highlightjs/styles/monokai.css";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import { Router } from "next/router";

const MyApp = (props: AppProps): JSX.Element => {
  const { Component, pageProps } = props;

  useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles && jssStyles.parentElement) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  Router.events.on("routeChangeStart", () => NProgress.start());
  Router.events.on("routeChangeComplete", () => NProgress.done());
  Router.events.on("routeChangeError", () => NProgress.done());

  return (
    <ThemeProvider theme={theme}>
      <Component {...pageProps} />
    </ThemeProvider>
  );
};

export default MyApp;
