import GlobalProvider from "hooks/store/GlobalProvider";
import type { AppProps } from "next/app";
import Head from "next/head";
import * as React from "react";
import "tailwindcss/tailwind.css";
import LightboxProvider from "widgets/lightbox/LightboxProvider";

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <React.Fragment>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content="JP Calvo's portfolio" />
        <meta name="keywords" content="jp calvo, portfolio" />
        <meta name="author" content="jp calvo" />

        <meta
          property="og:url"
          content="calvo-jp.vercel.app"
          key="meta.og.url"
        />
        <meta
          property="og:title"
          content="JP Calvo (John Paul Calvo)"
          key="meta.og.title"
        />
        <meta
          property="og:description"
          content="JP Calvo's portfolio"
          key="meta.og.description"
        />
        <meta
          property="og:keywords"
          content="jp calvo, portfolio"
          key="meta.og.keywords"
        />
      </Head>

      <GlobalProvider>
        <LightboxProvider>
          <Component {...pageProps} />
        </LightboxProvider>
      </GlobalProvider>
    </React.Fragment>
  );
};

export default MyApp;
