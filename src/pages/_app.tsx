import React, { useEffect } from 'react';
import { ThemeProvider } from '@material-ui/core/styles';
import { AppProps } from 'next/app';
import 'ress';
import '../../styles.scss';
import 'highlightjs/styles/github.css';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import { Router } from 'next/router';
import Head from 'next/head';
import * as gtag from '../lib/gtag';
import theme from '../components/theme';
import Layout from '../components/shared/Layout';
import useRouterScroll from '../hooks/useRouterScroll';

// Binding events.
Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

const MyApp = (props: AppProps): JSX.Element => {
  const { Component, pageProps } = props;
  useRouterScroll();

  useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles && jssStyles.parentElement) {
      jssStyles.parentElement.removeChild(jssStyles);
    }

    if (gtag.GA_ID) {
      const handleRouteChange = (path: string) => {
        gtag.pageView(path);
      };

      Router.events.on('routeChangeComplete', handleRouteChange);

      return () => {
        Router.events.off('routeChangeComplete', handleRouteChange);
      };
    }

    return undefined;
  }, []);

  return (
    <>
      <Head>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <ThemeProvider theme={theme}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ThemeProvider>
    </>
  );
};

export default MyApp;
