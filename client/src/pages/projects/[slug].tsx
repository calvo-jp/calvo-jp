import type { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import * as React from 'react';
import * as services from 'services/projects';
import IProject from 'types/project';

interface Params {
  [key: string]: string;
  slug: string;
}

export const getStaticPaths: GetStaticPaths<Params> = async () => {
  const items = await services.fetchAll();
  const paths = items.map(({ id: slug }) => ({ params: { slug } }));

  return {
    paths,
    fallback: 'blocking',
  };
};

export const getStaticProps: GetStaticProps<IProject> = async (context) => {
  const params = context.params as Params;
  const project = await services.fetchOne(params.slug);

  if (!project) return { notFound: true };

  return {
    props: project,
    revalidate: 600, // 10mins
  };
};

const Project: NextPage<IProject> = (props) => {
  const router = useRouter();

  if (router.isFallback) return <div className="p-4">Loading...</div>;

  return (
    <React.Fragment>
      <Head>
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
