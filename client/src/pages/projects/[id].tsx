import items from 'assets/json/projects.json';
import type { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import * as React from 'react';
import IProject from 'types/project';

interface SearchParams {
  [key: string]: string;
  id: string;
}

export const getStaticPaths: GetStaticPaths<SearchParams> = async () => {
  const paths = items.map(({ id }) => ({ params: { id } }));

  return {
    paths,
    fallback: 'blocking',
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

      <div>
        <header className="sticky top-0 bg-white py-4 px-6 flex items-center justify-between">
          <Link href="/projects" passHref>
            <a>All Projects</a>
          </Link>

          <div>
            <a
              href="https://www.github.com/calvo-jp/pedicab"
              target="_blank"
              rel="noreferrer"
            >
              Source code
            </a>
          </div>
        </header>

        <main>
          <div className="relative flex items-center justify-center">
            <Image
              src={banner}
              alt=""
              layout="fill"
              className="max-w-[200%] min-w-[100%] max-h-[200%] min-h-[100%]"
            />
          </div>

          <div className="p-4 md:p-8 lg:p-16 xl:p-32 flex flex-col gap-4">
            <div>
              <h1 className="text-4xl">{title}</h1>
              <p>{description}</p>

              <div className="flex gap-1 mt-2 text-sm flex-wrap">
                {tags.map((tag) => (
                  <span key={tag} className="bg-blue-200 p-1 px-2">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="grid auto-rows-[250px] grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {images.map((image, index) => (
                <div className="relative border border-gray-100" key={index}>
                  <Image src={image} alt="" layout="fill" />
                </div>
              ))}
            </div>
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
