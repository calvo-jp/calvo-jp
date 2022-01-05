import '@fontsource/m-plus-code-latin/100.css';
import '@fontsource/m-plus-code-latin/200.css';
import '@fontsource/m-plus-code-latin/300.css';
import '@fontsource/m-plus-code-latin/400.css';
import '@fontsource/m-plus-code-latin/500.css';
import '@fontsource/m-plus-code-latin/600.css';
import '@fontsource/m-plus-code-latin/700.css';
import metatags from 'assets/json/metatags.json';
import StoreProvider from 'hooks/store/provider';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import * as React from 'react';
import 'tailwindcss/tailwind.css';
import LightboxProvider from 'widgets/lightbox/LightboxProvider';

const App: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <React.Fragment>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content={metatags.description} />
        <meta name="keywords" content={metatags.keywords} />
        <meta name="author" content={metatags.author} />

        <meta property="og:url" content={metatags.url} key="meta.og.url" />
        <meta
          property="og:title"
          content={metatags.author}
          key="meta.og.title"
        />
        <meta
          property="og:description"
          content={metatags.description}
          key="meta.og.description"
        />
        <meta
          property="og:keywords"
          content={metatags.keywords}
          key="meta.og.keywords"
        />
      </Head>

      <StoreProvider>
        <LightboxProvider>
          <Component {...pageProps} />
        </LightboxProvider>
      </StoreProvider>
    </React.Fragment>
  );
};

export default App;
