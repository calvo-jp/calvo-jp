import items from 'assets/json/projects.json';
import type { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import * as React from 'react';
import IProject from 'types/project';
import ChevronLeftIcon from 'widgets/icons/ChevronLeft';

interface SearchParams {
  [key: string]: string;
  id: string;
}

export const getStaticPaths: GetStaticPaths<SearchParams> = async () => {
  const paths = items.map(({ id }) => ({ params: { id } }));

  return {
    paths,
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps<IProject, SearchParams> = async (
  context
) => {
  const project = items.find((item) => item.id === context.params!.id);

  if (!project) return { notFound: true };

  return {
    props: project,
    revalidate: 60 * 60 * 24, // 24hours
  };
};

const Project: NextPage<IProject> = ({
  tags,
  name,
  description,
  keywords,
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
          content={keywords.join()}
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
              <span>Source Code</span>
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
                {tags.map((tag) => (
                  <span key={tag} className="bg-blue-200 p-1 px-2">
                    <div>{tag}</div>
                  </span>
                ))}
              </div>
            </div>

            <div className="grid auto-rows-[250px] grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {screenshots.map((screnshot, index) => (
                <div key={index} className="relative border border-gray-100">
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
