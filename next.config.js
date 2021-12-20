const isDevelopment = process.env.NODE_ENV === "development";

/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    domains: ["localhost"],
  },
  rewrites: async () => {
    return [
      {
        source: "/api/:path*",
        destination: (() => {
          if (isDevelopment) {
            return "http://localhost:3000/api/:path*";
          } else {
            return "https://calvo-jp.vercel.app/api/:path*";
          }
        })(),
      },
    ];
  },
  redirects: async () => {
    return [
      {
        source: "/",
        destination: "/about",
        permanent: true,
      },
    ];
  },
};
