import Header from "layouts/Header";
import type { GetStaticProps, NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import * as React from "react";
import * as services from "services/project";
import IProject from "types/project";

interface Props {
  items: IProject[];
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  const items = await services.read.all();

  return {
    props: {
      items,
    },
    revalidate: 60 * 60 * 48, // 2days
  };
};

const Projects: NextPage<Props> = ({ items }) => {
  return (
    <React.Fragment>
      <Head>
        <title>JP Calvo | Projects</title>
      </Head>

      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow p-4 lg:p-16 pt-0 lg:pt-8">
          <section className="grid gap-8 md:gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {items.map((item) => (
              <Project key={item.slug} {...item} />
            ))}
          </section>
        </main>
      </div>
    </React.Fragment>
  );
};

const Project: React.FC<IProject> = ({ slug, name, description, banner }) => {
  return (
    <Link href={"/projects/".concat(slug)} passHref>
      <a className="md:p-2 rounded-md outline-none border border-transparent transition-all duration-300 md:hover:border-blue-200 md:hover:ring-4 md:hover:ring-blue-100 md:focus:border-blue-200 md:focus:ring-4 md:focus:ring-blue-100">
        <div className="relative w-full h-[250px] border border-gray-100">
          <Image
            layout="fill"
            src={banner}
            alt=""
            objectFit="cover"
            objectPosition="center"
          />
        </div>

        <div className="mt-2">
          <h3 className="text-lg">{name}</h3>
          <p className="text-sm">{description}</p>
        </div>
      </a>
    </Link>
  );
};

export default Projects;
