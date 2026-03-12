/* eslint-disable @typescript-eslint/no-explicit-any */
import nextMdx from "@next/mdx";
import { type NextConfig } from "next";

const nextConfig: NextConfig = nextMdx({
  extension: /\.mdx?$/,
})({
  output: "export",
  pageExtensions: ["md", "mdx", "ts", "tsx"],
  productionBrowserSourceMaps: true,
  reactStrictMode: true,
  webpack: (config) => {
    config.module.rules
      .find(({ oneOf }: any) => Array.isArray(oneOf))
      ?.oneOf.filter(({ use }: any) => Array.isArray(use))
      .forEach(({ use }: any) => {
        use.forEach((moduleLoader: any) => {
          if (
            moduleLoader.loader &&
            moduleLoader.loader.includes("css-loader") &&
            !moduleLoader.loader.includes("postcss-loader") &&
            typeof moduleLoader.options.modules === "object" &&
            !moduleLoader.options.fontLoader
          ) {
            moduleLoader.options = {
              ...moduleLoader.options,
              modules: {
                ...moduleLoader.options.modules,
                mode: "global",
              },
            };
          }
        });
      });

    return config;
  },
});

export default nextConfig;
