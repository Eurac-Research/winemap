/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
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
      },{
            protocol: "https",
            hostname: "www.datocms-assets.com",
            port: "",
            pathname: "/**",
          },
    ],
  },
};

module.exports = nextConfig;
