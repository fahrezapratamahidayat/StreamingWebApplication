/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      remotePatterns: [
        {
          protocol: "https",
          hostname: "image.tmdb.org",
          port: "",
          pathname: "/**",
        },
        {
          protocol: "https",
          hostname: "www.koimoi.com",
          port: "",
          pathname: "/**",
        },
        {
          protocol: "https",
          hostname: "cdn.myanimelist.net",
          port: "",
          pathname: "/**",
        }
      ],
    },
  };
  
  module.exports = nextConfig;
  