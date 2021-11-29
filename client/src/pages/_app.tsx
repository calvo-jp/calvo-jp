import GlobalProvider from 'hooks/store/GlobalProvider';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import * as React from 'react';
import 'tailwindcss/tailwind.css';

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <React.Fragment>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content="JP Calvo's portfolio" />
        <meta name="keywords" content="jp calvo, portfolio" />
        <meta name="author" content="jp calvo" />

        <meta property="og:url" content="calvo-jp.vercel.app" key="og.url" />
        <meta property="og:title" content="JP Calvo" key="og.title" />
        <meta
          property="og:description"
          content="JP Calvo's portfolio"
          key="og.description"
        />
        <meta
          property="og:keywords"
          content="jp calvo, portfolio"
          key="og.keywords"
        />
      </Head>

      <GlobalProvider>
        <div className="min-h-screen text-gray-700 bg-white font-sans">
          <Component {...pageProps} />
        </div>
      </GlobalProvider>
    </React.Fragment>
  );
};

export default MyApp;
