import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import * as React from 'react';

interface Params {
  [key: string]: string;
  slug: string;
}

export const getStaticPaths: GetStaticPaths<Params> = async () => {
  return {
    paths: [
      { params: { slug: 'pedicab' } },
      { params: { slug: 'parcels' } },
      { params: { slug: 'recipes' } },
    ],
    fallback: 'blocking',
  };
};

interface Props {
  id: string;
  title: string;
  description: string;
  image: string;

  /** url of app if it is live or available online */
  url?: string;
}

export const getStaticProps: GetStaticProps<Props> = (context) => {
  const params = context.params as Params;

  return {
    props: {
      id: params.slug,
      image: '',
      title: '',
      description: '',
    },
    revalidate: 600, // 10mins
  };
};

const Project: NextPage<Props> = (props) => {
  const router = useRouter();

  if (router.isFallback) return <div>Loading...</div>;

  return (
    <React.Fragment>
      <Head>
        <meta property="og:url" content={props.url} />
        <meta property="og:title" content={props.title} />
        <meta property="og:description" content={props.description} />
        <meta property="og:image" content={props.image} />

        <title>{props.id}</title>
      </Head>

      <div></div>
    </React.Fragment>
  );
};

export default Project;
