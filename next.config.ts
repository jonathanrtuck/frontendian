import { createVanillaExtractPlugin } from "@vanilla-extract/next-plugin";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  compiler: {
    styledComponents: true,
  },
  output: "export",
  productionBrowserSourceMaps: true,
  reactStrictMode: true,
};

const withVanillaExtract = createVanillaExtractPlugin();

export default withVanillaExtract(nextConfig);
