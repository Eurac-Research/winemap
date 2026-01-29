/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // i18n: {
  //   locales: ["en"],
  //   defaultLocale: "en",
  // },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "webassets.eurac.edu",
        // port: '',
        // pathname: '/account123/**',
      },
    ],
  },
  async redirects() {
    return [
      {
        source: "/about-data",
        destination: "/about#data",
        permanent: true,
      },
      {
        source: "/about-pdo",
        destination: "/about#pdo",
        permanent: true,
      },
      {
        source: "/vulnerability",
        destination: "/about#vulnerability",
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
