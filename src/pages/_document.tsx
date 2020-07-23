import Document, { Html, Head, Main, NextScript } from "next/document";
import * as React from "react";
import { ServerStyleSheets } from "@material-ui/styles";

interface CustomDocumentInterface {
  url: string;
  title: string;
  description: string;
}

class CustomDocument extends Document implements CustomDocumentInterface {
  url = "https://example.com";
  title = "Jun Dev Blog";
  description = "Jun Dev Blog";

  render(): JSX.Element {
    return (
      <Html lang="ja-JP">
        <Head>
          <meta name="description" content={this.description} />
          <meta name="theme-color" content="#333" />
          <meta property="og:type" content="website" />
          <meta property="og:title" content={this.title} />
          <meta property="og:url" content={this.url} />
          <meta property="og:description" content={this.description} />
          <meta property="og:site_name" content={this.title} />
          <meta property="og:image" content={`${this.url}/ogp.png`} />
          <meta name="format-detection" content="telephone=no" />
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content={this.title} />
          <meta name="twitter:description" content={this.description} />
          <meta name="twitter:image" content={`${this.url}/ogp.png`}></meta>
          <link rel="icon" href="/favicon.ico" />
          <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
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
      <React.Fragment key="styles">
        {initialProps.styles}
        {sheets.getStyleElement()}
      </React.Fragment>,
    ],
  };
};

export default CustomDocument;
