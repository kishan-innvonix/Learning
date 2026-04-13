import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  logging: {
    fetches: {
      fullUrl: true, // logs every fetch() call with URL + cache status
    },
  },
  images: {
    domains: ["cdn.dummyjson.com", "dummyjson.com"],
  },
};

export default nextConfig;
