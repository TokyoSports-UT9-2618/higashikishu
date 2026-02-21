import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,

  // Strict-mode React
  reactStrictMode: true,

  // Static export uses unoptimized images
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
