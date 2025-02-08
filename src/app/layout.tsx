import "@/css";
import * as themes from "@/themes";
import type { Metadata, Viewport } from "next";
import type { FunctionComponent, PropsWithChildren } from "react";

const DEFAULT_THEME = Object.values(themes).find(({ isDefault }) => isDefault)!;

export const metadata: Metadata = {
  description: "Portfolio site for Jonathan Tucker",
  title: "frontendian",
};
export const viewport: Viewport = {
  themeColor: "#000000",
};

const Layout: FunctionComponent<PropsWithChildren> = ({ children }) => (
  <html className={DEFAULT_THEME.id} lang="en">
    <body>{children}</body>
  </html>
);

export default Layout;
