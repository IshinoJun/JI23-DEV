import React, { useEffect } from "react";
import { ThemeProvider } from "@material-ui/core/styles";
import theme from "../components/theme";
import App, { AppProps } from "next/app";
import "ress";
import "../../styles.scss";
import { DevClientContextProvider } from "../context/DevClientContext";
import Head from "next/head";
import "highlightjs/styles/monokai.css";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import { ImageContext } from "../context/ImageContext";
import DevClient from "./api/DevClient";
import { AppContextType } from "next/dist/next-server/lib/utils";
import { Router } from "next/router";
import Images from "../models/Images";

interface Props {
  images: Images;
}

const MyApp = (props: AppProps & Props): JSX.Element => {
  const { Component, pageProps, images } = props;

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
    <DevClientContextProvider>
      <ImageContext.Provider value={images}>
        <Head>
          <title>Jun Dev Blog</title>
          <meta
            name="viewport"
            content="initial-scale=1.0, width=device-width"
          />
        </Head>
        <ThemeProvider theme={theme}>
          <Component {...pageProps} />
        </ThemeProvider>
      </ImageContext.Provider>
    </DevClientContextProvider>
  );
};

MyApp.getInitialProps = async (appContext: AppContextType<Router>) => {
  const devClient = new DevClient();
  const appProps = await App.getInitialProps(appContext);
  const images = await devClient.getImages();
  return { ...appProps, images };
};

export default MyApp;
