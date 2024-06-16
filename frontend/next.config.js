/** @type {import('next').NextConfig} */

const nextConfig = {
  // async rewrites() {
  //   return [
  //     {
  //       source: `/api/:path*`,
  //       destination: `/api/:path*`,
  //     },
  //     {
  //       source: `/:path*`,
  //       destination: `/en/:path*`,
  //     },
  //   ];
  // },
  images: {
    domains: [
      "res.cloudinary.com",
      "localhost",
      "images.pexels.com",
      "lh3.googleusercontent.com",
    ],
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "1337",
        pathname: "/uploads/**",
      },
      {
        protocol: "https",
        hostname: "images.pexels.com",
      },
    ],
  },
};

module.exports = nextConfig;
