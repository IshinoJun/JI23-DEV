import React, { useEffect } from 'react';
import { ThemeProvider } from '@material-ui/core/styles';
import { AppProps } from 'next/app';
import 'ress';
import '../../styles.scss';
import 'highlightjs/styles/monokai.css';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import { Router } from 'next/router';
import * as gtag from '../lib/gtag';
import theme from '../components/theme';

// Binding events.
Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

const MyApp = (props: AppProps): JSX.Element => {
  const { Component, pageProps } = props;

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
    <ThemeProvider theme={theme}>
      <Component {...pageProps} />
    </ThemeProvider>
  );
};

export default MyApp;
