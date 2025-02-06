import { createVanillaExtractPlugin } from "@vanilla-extract/next-plugin";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  compiler: {
    styledComponents: true,
  },
  output: "export",
  productionBrowserSourceMaps: true,
  reactStrictMode: true,
  webpack: (config, { nextRuntime, webpack }) => {
    // @see https://github.com/vanilla-extract-css/vanilla-extract/issues/1043
    if (!nextRuntime) {
      config.plugins.push(
        new webpack.BannerPlugin({
          banner: `$RefreshReg$ = () => {};\n$RefreshSig$ = () => () => {};\n`,
          entryOnly: true,
          include: /\.css.ts$/,
          raw: true,
        })
      );
    }

    return config;
  },
};

const withVanillaExtract = createVanillaExtractPlugin();

export default withVanillaExtract(nextConfig);
