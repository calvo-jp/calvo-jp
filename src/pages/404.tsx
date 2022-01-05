import ChevronLeftIcon from '@heroicons/react/solid/ChevronLeftIcon';
import Footer from 'layouts/Footer';
import Head from 'next/head';
import Link from 'next/link';
import * as React from 'react';

const NotFound = () => {
  return (
    <React.Fragment>
      <Head>
        <title>Error 404 | Page not found</title>
      </Head>

      <div className="min-h-screen flex flex-col">
        <header className="bg-white py-4 px-6 flex items-center justify-between">
          <Link href="/" passHref>
            <a className="flex items-center gap-1">
              <ChevronLeftIcon className="h-[14px] w-[14px]" />
              <span>Go Home</span>
            </a>
          </Link>
        </header>

        <main className="flex-grow flex items-center justify-center p-2">
          <div>
            <h1 className="text-gray-300 text-9xl font-bold">4O4</h1>
          </div>
        </main>

        <Footer />
      </div>
    </React.Fragment>
  );
};

export default NotFound;
