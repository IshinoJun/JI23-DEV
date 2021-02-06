import React, { useEffect, useState } from 'react';
import { ThemeProvider } from '@material-ui/core/styles';
import { AppProps } from 'next/app';
import 'ress';
import '../../styles.scss';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import { Router, useRouter } from 'next/router';
import Head from 'next/head';
import * as gtag from '../lib/gtag';
import theme from '../components/theme';
import Layout from '../components/shared/Layout';
import useRouterScroll from '../hooks/useRouterScroll';
import SearchContext from '../context/searchContext';
import BlogsQuery from '../models/BlogsQuery';

// Binding events.
Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

const MyApp = (props: AppProps): JSX.Element => {
  const { Component, pageProps } = props;
  useRouterScroll();

  const [search, setSearch] = useState<string>('');
  const router = useRouter();

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

  useEffect(() => {
    const urlQuery = router.query as BlogsQuery;
    if (urlQuery && urlQuery.keyword) {
      setSearch(urlQuery.keyword);
    } else {
      setSearch('');
    }
  }, [router]);

  return (
    <>
      <Head>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/github-markdown-css@3.0.1/github-markdown.min.css"
        />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <ThemeProvider theme={theme}>
        <SearchContext.Provider value={{ search, setSearch }}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </SearchContext.Provider>
      </ThemeProvider>
    </>
  );
};

export default MyApp;
