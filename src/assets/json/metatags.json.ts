interface Metatags {
  description: string;
  keywords: string;
  author: string;
  title: string;
  image: string;
  url: string;
}

const metatags: Metatags = {
  description: "".concat(
    "Official website of John Paul Calvo (aka JP Calvo), a web dev based in PH.",
    "I am 29 years old and I am currently a freshman student at Cedar College, Inc.",
    "I develop websites with modern look and feel and always ensures maintainability.",
    "I love opensource and will probably use opensource softwares forever.",
    "I also like to play guitar during weekends and loves coffee with less sugar."
  ),
  keywords: [
    "jp calvo",
    "portfolio",
    "freelancer",
    "web developer",
    "modern",
    "website",
    "awesome",
    "programmer",
    "css",
    "html",
    "python",
    "nodejs",
    "postgres",
    "mongodb",
    "sqlite",
    "fastapi",
    "sqlmodel",
    "sqlalchemy",
    "react",
    "nextjs",
    "tailwind",
    "prisma",
    "fastify",
    "expressjs",
    "opensource",
    "ubuntu",
    "linux",
  ].join(""),
  author: "jp calvo <calvojp92@gmail.com>",
  title: "JP Calvo - Awesome developer of modern websites",
  image: "/images/opengraph.jpg",
  url: "https://calvo-jp.vercel.app",
};

export default metatags;
