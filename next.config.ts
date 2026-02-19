import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // TODO: enable "export" once Contentful generateStaticParams is wired up
  // output: "export",

  // Strict-mode React
  reactStrictMode: true,

  // Image optimization – will be set to unoptimized when output: "export" is enabled
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
