import Footer from 'layouts/Footer';
import Header from 'layouts/Header';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import * as React from 'react';
import ChatIcon from 'widgets/icons/Chat';

const Landing = () => {
  return (
    <React.Fragment>
      <Head>
        <title>JP Calvo | About</title>
      </Head>

      <div className="flex flex-col min-h-screen">
        <Header />

        <main className="flex-grow flex flex-col md:flex-row p-2 items-center justify-center gap-8 lg:gap-16">
          <section className="w-[200px] h-[200px] md:w-[250px] md:h-[250px] lg:w-[300px] lg:h-[300px] xl:w-[325px] xl:h-[325px] relative rounded-full overflow-hidden border-8 border-gray-100 cursor-pointer"></section>

          <section className="flex flex-col items-center justify-center">
            <p className="text-4xl md:text-5xl lg:text-6xl text-center">
              <span>Hi, Iam</span>
              <strong className="ml-6 font-bold text-blue-500">John</strong>
              <span>.</span>
            </p>

            <p className="text-lg md:text-xl lg:text-2xl text-gray-600 mt-2 lg:mt-4 text-center">
              Awesome developer of modern websites
            </p>

            <Link href="/chat" passHref>
              <button className="mt-5 border-2 border-blue-500 py-3 px-6 rounded-2xl text-blue-500 font-bold text-lg hover:bg-blue-500 hover:text-white focus:bg-blue-500 focus:text-white focus:ring-4 focus:ring-blue-200 transition-colors duration-200 outline-none flex items-center justify-center gap-2">
                <ChatIcon />
                <span>Chat now</span>
              </button>
            </Link>
          </section>
        </main>

        <Footer />
      </div>
    </React.Fragment>
  );
};

export default Landing;
