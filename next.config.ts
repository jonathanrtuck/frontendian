import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  productionBrowserSourceMaps: true,
  reactStrictMode: true,
};

export default nextConfig;
