import path from "node:path";
import { defineConfig } from "@rsbuild/core";
import { pluginReact } from "@rsbuild/plugin-react";
import { pluginSvgr } from "@rsbuild/plugin-svgr";
import { pluginHtmlMinifierTerser } from "rsbuild-plugin-html-minifier-terser";

export default defineConfig({
  html: { template: "./index.html" },
  output: {
    distPath: { js: "scripts" },
    sourceMap: { js: "source-map" },
  },
  plugins: [
    pluginHtmlMinifierTerser(),
    pluginReact(),
    pluginSvgr({ svgrOptions: { exportType: "named" } }),
  ],
  resolve: { alias: { "@": path.resolve(__dirname, "./src") } },
});
