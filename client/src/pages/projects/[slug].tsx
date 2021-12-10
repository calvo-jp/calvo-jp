import clsx from 'clsx';
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
  slug: string;
}

export const getStaticPaths: GetStaticPaths<SearchParams> = async () => {
  const table = await services.fetchAll();
  const paths = table.rows.map(({ slug }) => ({ params: { slug } }));

  return {
    paths,
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps<IProject, SearchParams> = async (
  context
) => {
  const project = await services.fetchOne(context.params!.slug);

  if (!project) return { notFound: true };

  return {
    props: project,
    revalidate: 60 * 60 * 48, // 2days
  };
};

const Project: NextPage<IProject> = ({
  slug,
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
        <meta property="og:image" content={banner.url} key="meta.og.image" />
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
        <header className="bg-white py-4 px-6 flex items-center justify-between sticky top-0 z-30">
          <Link href="/projects" passHref>
            <a className="flex items-center gap-1">
              <ChevronLeftIcon className="h-[14px] w-[14px]" />
              <span>All Projects</span>
            </a>
          </Link>

          <div>
            <a
              href=""
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2"
            >
              <span>Source code</span>
            </a>
          </div>
        </header>

        <main>
          <Jumbotron {...banner} />

          <section className="p-4 md:p-8 flex flex-col gap-4 max-w-[1400px] mx-auto">
            <div>
              <h1 className="text-4xl">{name}</h1>
              <p>{description}</p>

              <Chips items={techstacks} />
            </div>

            <Grid items={screenshots} />
          </section>
        </main>
      </div>
    </React.Fragment>
  );
};

type JumbotronProps = IProject['banner'];

const Jumbotron = ({ url }: JumbotronProps) => {
  return (
    <section className="relative h-[400px] border-b border-gray-100 cursor-pointer">
      <Image
        src={url}
        alt=""
        layout="fill"
        objectFit="cover"
        objectPosition="center"
        // this aint workin'
        className="bg-fixed"
      />
    </section>
  );
};

interface ChipsProps {
  items: IProject['tags'];
}

const Chips = ({ items }: ChipsProps) => {
  return (
    <div className="flex gap-1 mt-2 text-sm flex-wrap">
      {items.map((item) => (
        <span key={item} className="bg-blue-200 p-1 px-2">
          <div>{item}</div>
        </span>
      ))}
    </div>
  );
};

interface GridProps {
  items: IProject['screenshots'];
}

const Grid = ({ items }: GridProps) => {
  return (
    <div className="grid auto-rows-[300px] md:auto-rows-[200px] lg:auto-rows-[250px] grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 grid-flow-row-dense">
      {items.map(({ url, ...all }) => (
        <GridItem key={url} url={url} {...all} />
      ))}
    </div>
  );
};

type GridItemProps = IProject['screenshots'][0];

const GridItem = ({ url, height, width, orientation }: GridItemProps) => {
  const square = orientation === 'square';
  const portrait = orientation === 'portrait';
  const landscape = orientation === 'landscape';

  return (
    <div
      key={url}
      className={clsx(
        'relative cursor-pointer group overflow-hidden',
        landscape && 'sm:col-span-2 md:col-span-1 lg:col-span-2',
        portrait && 'md:row-span-2',
        square && height > 1000 && 'md:row-span-2 md:col-span-2'
      )}
    >
      <Image
        src={url}
        alt=""
        layout="fill"
        objectFit="cover"
        objectPosition="center"
      />

      <ExpandIcon onClick={function () {}} />
    </div>
  );
};

// prettier-ignore
type ExpandIconProps = Omit<
  React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>,
  | 'className' 
  | 'children'
  | 'style' 
>;

const ExpandIcon = (props: ExpandIconProps) => {
  return (
    <div
      className="hidden group-hover:flex absolute top-0 left-0 w-full h-full bg-black bg-opacity-60 z-10 justify-center items-center"
      {...props}
    >
      <div className="w-[100px] h-[100px] relative group">
        <div className="absolute top-0 left-0 h-[30px] w-[30px] border-l-8 border-t-8 border-white border-opacity-50" />
        <div className="absolute bottom-0 left-0 h-[30px] w-[30px] border-l-8 border-b-8 border-white border-opacity-50" />
        <div className="absolute top-0 right-0 h-[30px] w-[30px] border-r-8 border-t-8 border-white border-opacity-50" />
        <div className="absolute bottom-0 right-0 h-[30px] w-[30px] border-r-8 border-b-8 border-white border-opacity-50" />
      </div>
    </div>
  );
};

export default Project;
