import "@/css";
import * as fonts from "@/fonts";
import * as themes from "@/themes";
import clsx from "clsx";
import type { Metadata, Viewport } from "next";
import type { FunctionComponent, PropsWithChildren } from "react";

const DEFAULT_THEME = Object.values(themes).find(({ isDefault }) => isDefault)!;
const FONT_VARIABLES = Object.values(fonts).map(({ variable }) => variable);

export const metadata: Metadata = {
  description: "Portfolio site for Jonathan Tucker",
  title: "frontendian",
};
export const viewport: Viewport = {
  themeColor: "#000000",
};

const Layout: FunctionComponent<PropsWithChildren> = ({ children }) => (
  <html className={clsx(FONT_VARIABLES, DEFAULT_THEME.id)} lang="en">
    <body>{children}</body>
  </html>
);

export default Layout;
