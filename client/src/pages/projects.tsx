import Footer from 'layouts/Footer';
import Header from 'layouts/Header';
import Head from 'next/head';
import Image from 'next/image';
import * as React from 'react';

const Projects = () => {
  return (
    <React.Fragment>
      <Head>
        <title>JP Calvo | Projects</title>
      </Head>

      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow p-4 lg:p-16 pt-0 lg:pt-8">
          <section className="grid gap-8 md:gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            <Item
              href=""
              title="Pedicab"
              description="Get a shorter, more meaningful url"
              image="/images/projects-showcase/does-not-exist.jpeg"
            />
            <Skeleton />
            <Skeleton />
          </section>
        </main>
        <Footer />
      </div>
    </React.Fragment>
  );
};

const Skeleton: React.FC = () => {
  return (
    <div className="animate-pulse md:p-2 rounded-md outline-none border border-transparent transition-all duration-300">
      <div className="w-full h-[250px] relative flex items-center justify-center overflow-hidden bg-gray-100" />

      <div className="mt-2">
        <div className="h-5 w-1/3 bg-gray-100" />
        <div className="h-4 w-full bg-gray-100 mt-2" />
      </div>
    </div>
  );
};

interface ItemProps {
  href: string;
  title: string;
  description: string;
  image: string;
}

const Item: React.FC<ItemProps> = ({ href, title, description, image }) => {
  return (
    <a
      href={href}
      title={href}
      target="_blank"
      rel="noreferrer"
      className="md:p-2 rounded-md outline-none border border-transparent transition-all duration-300 md:hover:border-blue-200 md:hover:ring-4 md:hover:ring-blue-100 md:focus:border-blue-200 md:focus:ring-4 md:focus:ring-blue-100"
    >
      <div className="w-full h-[250px] border border-gray-100 relative flex items-center justify-center overflow-hidden">
        <Image
          alt=""
          src={image}
          layout="fill"
          className="max-w-[200%] min-w-[100%] max-h-[200%] min-h-[100%]"
        />
      </div>

      <div className="mt-2">
        <h3 className="text-lg">{title}</h3>
        <p className="text-sm">{description}</p>
      </div>
    </a>
  );
};

export default Projects;
