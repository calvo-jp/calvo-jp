import Footer from 'layouts/Footer';
import Header from 'layouts/Header';
import Head from 'next/head';
import * as React from 'react';

const Landing = () => {
  return (
    <React.Fragment>
      <Head>
        <title>JP Calvo | About</title>
      </Head>

      <div className="flex flex-col min-h-screen">
        <Header />

        <main className="flex-grow flex p-2">
          <section className="flex-grow flex flex-col gap-4 items-center justify-center">
            <p className="text-6xl">
              Hi, Iam&nbsp;
              <strong className="text-6xl font-bold text-purple-500">
                John
              </strong>
              .
            </p>

            <p className="text-2xl text-gray-600">
              <span className="text-yellow-600">Awesome</span> developer of
              modern websites
            </p>

            <button className="w-[150px] bg-purple-500 text-purple-50 text-lg p-3 shadow-md flex items-center justify-center gap-2 rounded-full">
              <span>Chat now</span>
            </button>
          </section>
        </main>

        <Footer />
      </div>
    </React.Fragment>
  );
};

export default Landing;
