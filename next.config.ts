/* eslint-disable @typescript-eslint/no-explicit-any */
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  compiler: {
    styledComponents: true,
  },
  output: "export",
  productionBrowserSourceMaps: true,
  reactStrictMode: true,
};

export default nextConfig;
