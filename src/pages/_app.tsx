import React, { useEffect } from "react";
import { ThemeProvider } from "@material-ui/core/styles";
import theme from "../components/theme";
import { AppProps } from "next/app";
import { NextPage } from "next";
import "ress";
import "../../styles.scss";
import { DevClientContextProvider } from "../context/DevClientContext";

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
      <ThemeProvider theme={theme}>
        <Component {...pageProps} />
      </ThemeProvider>
    </DevClientContextProvider>
  );
};

export default MyApp;
