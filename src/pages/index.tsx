import Footer from 'layouts/Footer';
import Header from 'layouts/Header';
import Head from 'next/head';
import Image from 'next/image';
import * as React from 'react';

const Landing = () => {
  return (
    <React.Fragment>
      <Head>
        <title>JP Calvo | About</title>
      </Head>

      <div className="flex flex-col min-h-screen">
        <Header />

        <main className="flex-grow flex p-2 items-center justify-center gap-14">
          <section className="relative w-[300px] h-[300px] rounded-full overflow-hidden border-8 border-gray-100"></section>

          <section className="flex flex-col items-center justify-center">
            <About />
          </section>
        </main>

        <Footer />
      </div>
    </React.Fragment>
  );
};

const About = () => {
  return (
    <React.Fragment>
      <p className="text-6xl">
        <span>Hi, Iam</span>
        <strong className="ml-6 text-6xl font-bold text-blue-500">John</strong>
        <span>.</span>
      </p>

      <p className="text-2xl text-gray-600 mt-4">
        Awesome developer of modern websites
      </p>

      {/* <button className="mt-5 w-[150px] bg-purple-500 text-purple-50 text-lg p-3 shadow-md flex items-center justify-center gap-2 rounded-xl focus:ring-4 focus:ring-purple-200 transition-shadow duration-300 focus:text-white">
        <span>Chat now</span>
      </button> */}
      <button className="mt-5 w-[150px] border-2 border-blue-500 p-3 rounded-2xl text-blue-500 font-bold text-lg hover:bg-blue-500 hover:text-white transition-colors duration-200">
        <span>Chat now</span>
      </button>
    </React.Fragment>
  );
};

export default Landing;
