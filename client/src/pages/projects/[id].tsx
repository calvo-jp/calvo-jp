import items from 'assets/json/projects.json';
import type { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import * as React from 'react';
import IProject from 'types/project';
interface Params {
  [key: string]: string;
  id: string;
}

export const getStaticPaths: GetStaticPaths<Params> = async () => {
  const paths = items.map(({ id }) => ({ params: { id } }));

  return {
    paths,
    fallback: 'blocking',
  };
};

export const getStaticProps: GetStaticProps<IProject> = async (context) => {
  const params = context.params as Params;
  const project = items.find((item) => item.id === params.id);

  if (!project) return { notFound: true };

  return {
    props: project,
    revalidate: 60 * 60 * 24, // 24hours
  };
};

const Project: NextPage<IProject> = ({
  id,
  tags,
  title,
  description,
  banner,
  images,
}) => {
  const router = useRouter();

  if (router.isFallback) return <Skeleton />;

  return (
    <React.Fragment>
      <Head>
        <meta property="og:title" content={title} key="og.title" />
        <meta property="og:image" content={banner} key="og.image" />
        <meta
          property="og:description"
          content={description}
          key="og.description"
        />

        <title>{id}</title>
      </Head>

      <div className="flex flex-col min-h-screen">
        <header className="py-4 px-6">
          <Link href="/projects" passHref>
            <a>All Projects</a>
          </Link>
        </header>

        <main className="flex-grow">
          <div className="p-6">
            <h1>{title}</h1>
            <p>{description}</p>
          </div>
        </main>
      </div>
    </React.Fragment>
  );
};

const Skeleton = () => {
  return <div></div>;
};

export default Project;
