import Footer from "layouts/Footer";
import Header from "layouts/Header";
import Head from "next/head";
import Image from "next/image";
import * as React from "react";
import useLightbox from "widgets/lightbox/useLightbox";

const Landing = () => {
  const [, setLightbox] = useLightbox();

  const expand = () => {
    setLightbox({
      open: true,
      src: "/images/calvojp.jpg",
    });
  };

  return (
    <React.Fragment>
      <Head>
        <title>JP Calvo | About</title>
      </Head>

      <div className="flex flex-col min-h-screen">
        <Header />

        <main className="flex-grow flex flex-col md:flex-row p-2 items-center justify-center gap-8 lg:gap-16">
          <section
            className="w-[225px] h-[225px] sm:w-[250px] sm:h-[250px] md:w-[275px] md:h-[275px] lg:w-[300px] lg:h-[300px] xl:w-[325px] xl:h-[325px] rounded-full border-8 border-gray-100 relative overflow-hidden cursor-pointer"
            onClick={expand}
          >
            <Image
              src="/images/calvojp.jpg"
              alt=""
              layout="fill"
              objectFit="cover"
              objectPosition="center"
              priority
            />
          </section>

          <section className="flex flex-col items-center justify-center">
            <p className="text-4xl md:text-5xl lg:text-6xl text-center">
              <span>Hi, Iam</span>
              <strong className="ml-6 font-bold text-blue-400">John</strong>
              <span>.</span>
            </p>

            <p className="text-lg md:text-xl lg:text-2xl text-gray-600 mt-2 lg:mt-4 text-center">
              Awesome developer of modern websites
            </p>

            <a
              href="https://www.m.me/calvojp"
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-center gap-2 mt-5 py-3 pr-5 pl-4 rounded-xl text-lg font-bold bg-blue-500 text-white hover:ring-4 hover:ring-blue-200 focus:ring-4 focus:ring-blue-200 transition-colors duration-300 outline-none"
            >
              <Image
                src="/images/icons/messenger.png"
                alt=""
                width="24"
                height="24"
                className="block"
              />
              <div>Chat me now</div>
            </a>
          </section>
        </main>

        <Footer />
      </div>
    </React.Fragment>
  );
};

export default Landing;
