import React, { useEffect } from "react";
import { ThemeProvider } from "@material-ui/core/styles";
import theme from "../components/theme";
import { AppProps } from "next/app";
import { NextPage } from "next";
import "ress";
import "../../styles.scss";
import { DevClientContextProvider } from "../context/DevClientContext";
import Head from "next/head";

const MyApp: NextPage<AppProps> = ({ Component, pageProps }) => {
  useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles && jssStyles.parentElement) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  return (
    <DevClientContextProvider>
      <Head>
        <title>Jun Dev Blog</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <ThemeProvider theme={theme}>
        <Component {...pageProps} />
      </ThemeProvider>
    </DevClientContextProvider>
  );
};

export default MyApp;
