import items from 'assets/json/projects.json';
import Footer from 'layouts/Footer';
import Header from 'layouts/Header';
import type { GetStaticProps, NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import * as React from 'react';
import IProject from 'types/project';

interface Props {
  items: IProject[];
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  return {
    props: {
      items,
    },
    revalidate: 1800, // 30mins
  };
};

const Projects: NextPage<Props> = (props) => {
  return (
    <React.Fragment>
      <Head>
        <title>JP Calvo | Projects</title>
      </Head>

      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow p-4 lg:p-16 pt-0 lg:pt-8">
          <section className="grid gap-8 md:gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {props.items.map((item) => (
              <Project key={item.id} {...item} />
            ))}
          </section>
        </main>
        <Footer />
      </div>
    </React.Fragment>
  );
};

const Project: React.FC<IProject> = ({ id, title, description, banner }) => {
  const href = '/projects/' + id;

  return (
    <Link href={href} passHref>
      <a className="md:p-2 rounded-md outline-none border border-transparent transition-all duration-300 md:hover:border-blue-200 md:hover:ring-4 md:hover:ring-blue-100 md:focus:border-blue-200 md:focus:ring-4 md:focus:ring-blue-100">
        <div className="w-full h-[250px] border border-gray-100 relative flex items-center justify-center overflow-hidden">
          <Image
            alt=""
            src={banner}
            layout="fill"
            className="max-w-[200%] min-w-[100%] max-h-[200%] min-h-[100%]"
          />
        </div>

        <div className="mt-2">
          <h3 className="text-lg">{title}</h3>
          <p className="text-sm">{description}</p>
        </div>
      </a>
    </Link>
  );
};

export default Projects;
