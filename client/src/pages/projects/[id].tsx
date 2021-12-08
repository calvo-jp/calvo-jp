import type { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import * as React from 'react';
import services from 'services/projects';
import IProject from 'types/project';
import ChevronLeftIcon from 'widgets/icons/ChevronLeft';

interface SearchParams {
  [key: string]: string;
  id: string;
}

export const getStaticPaths: GetStaticPaths<SearchParams> = async () => {
  const table = await services.fetchAll();
  const paths = table.rows.map(({ id }) => ({ params: { id } }));

  return {
    paths,
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps<IProject, SearchParams> = async (
  context
) => {
  const project = await services.fetchOne(context.params!.id);

  if (!project) return { notFound: true };

  return {
    props: project,
    revalidate: 60 * 60 * 48, // 2days
  };
};

const Project: NextPage<IProject> = ({
  tags,
  name,
  description,
  techstacks,
  banner,
  screenshots,
}) => {
  const router = useRouter();

  if (router.isFallback)
    return <div className="p-2 text-gray-600 text-md">Loading...</div>;

  return (
    <React.Fragment>
      <Head>
        <title>{name}</title>
        <meta property="og:title" content={name} key="meta.og.title" />
        <meta property="og:image" content={banner} key="meta.og.image" />
        <meta
          property="og:keywords"
          content={tags.join()}
          key="meta.og.keywords"
        />
        <meta
          property="og:description"
          content={description}
          key="meta.og.description"
        />
      </Head>

      <div>
        <header className="bg-white py-4 px-6 flex items-center justify-between">
          <Link href="/projects" passHref>
            <a className="flex items-center gap-1">
              <ChevronLeftIcon className="h-[14px] w-[14px]" />
              <span>All Projects</span>
            </a>
          </Link>

          <div>
            <a
              href="https://www.github.com/calvo-jp/pedicab"
              target="_blank"
              rel="noreferrer"
            >
              Source Code
            </a>
          </div>
        </header>

        <main>
          <div className="relative h-[400px] border-b border-gray-100">
            <Image src={banner} alt="" layout="fill" />
          </div>

          <div className="p-4 md:p-8 flex flex-col gap-4 max-w-[1200px] mx-auto">
            <div>
              <h1 className="text-4xl">{name}</h1>
              <p>{description}</p>

              <div className="flex gap-1 mt-2 text-sm flex-wrap">
                {techstacks.map((techstack) => (
                  <span key={techstack} className="bg-blue-200 p-1 px-2">
                    <div>{techstack}</div>
                  </span>
                ))}
              </div>
            </div>

            <div className="grid auto-rows-[250px] grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {screenshots.map((screnshot) => (
                <div
                  key={screnshot}
                  className="relative border border-gray-100"
                >
                  <Image src={screnshot} alt="" layout="fill" />
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </React.Fragment>
  );
};

export default Project;
