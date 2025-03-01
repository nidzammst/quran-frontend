import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/",
        destination: "/id",
        permanent: true, // Set true untuk redirect permanen (301)
      },
      {
        source: "/id/sheet",
        destination: "/id/sheet/1",
        permanent: true, // Set true untuk redirect permanen (301)
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "assets.aceternity.com",
      },
      {
        protocol: "https",
        hostname: "raw.githubusercontent.com",
      },
    ],
  },
};

export default nextConfig;
