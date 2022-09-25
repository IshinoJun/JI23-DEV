/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { ServerStyleSheets } from '@material-ui/core';
import Document, { Head, Html, Main, NextScript } from 'next/document';
import * as React from 'react';

class CustomDocument extends Document {
  render(): JSX.Element {
    return (
      <Html lang='ja-JP'>
        <Head prefix='og: http://ogp.me/ns# fb: http://ogp.me/ns/fb# article: http://ogp.me/ns/article#'>
          <link rel='apple-touch-icon' sizes='180x180' href='/icon.png' />
          <link rel='icon' type='image/png' href='/icon.png' sizes='192x192' />
          <meta name='robots' content='noindex' />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

CustomDocument.getInitialProps = async (ctx) => {
  // Render app and page and get the context of the page with collected side effects.
  const sheets = new ServerStyleSheets();
  const originalRenderPage = ctx.renderPage;

  ctx.renderPage = () =>
    originalRenderPage({
      enhanceApp: (App) => (props) => sheets.collect(<App {...props} />),
    });

  const initialProps = await Document.getInitialProps(ctx);

  return {
    ...initialProps,
    // Styles fragment is rendered after the app and page rendering finish.
    styles: [
      <React.Fragment key='styles'>
        {initialProps.styles}
        {sheets.getStyleElement()}
      </React.Fragment>,
    ],
  };
};

export default CustomDocument;
