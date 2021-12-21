import GlobalProvider from "hooks/store/GlobalProvider";
import type { AppProps } from "next/app";
import Head from "next/head";
import * as React from "react";
import "tailwindcss/tailwind.css";
import LightboxProvider from "widgets/lightbox/LightboxProvider";

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
  const description = [
    "Official website of John Paul Calvo (aka JP Calvo), a web dev based in PH.",
    "I am 29 years old and I am currently a freshman student at Cedar College, Inc.",
    "I develop websites with modern look and feel and always ensures maintainability.",
    "I also like to play guitar during weekends and loves coffee with less sugar.",
  ].join("");

  const keywords = [
    "jp calvo",
    "portfolio",
    "freelancer",
    "web developer",
    "modern",
    "website",
    "awesome",
    "programmer",
    "css",
    "html",
    "python",
    "nodejs",
    "postgres",
    "mongodb",
    "sqlite",
    "fastapi",
    "sqlmodel",
    "sqlalchemy",
    "react",
    "nextjs",
    "tailwind",
    "prisma",
    "fastify",
    "expressjs",
  ].join();

  return (
    <React.Fragment>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
        <meta name="author" content="jp calvo <calvojp92@gmail.com>" />

        <meta
          property="og:url"
          content="https://calvo-jp.vercel.app"
          key="meta.og.url"
        />
        <meta property="og:title" content="JP Calvo" key="meta.og.title" />
        <meta
          property="og:description"
          content={description}
          key="meta.og.description"
        />
        <meta
          property="og:keywords"
          content={keywords}
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
