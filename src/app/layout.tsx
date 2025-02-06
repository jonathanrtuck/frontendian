import type { Metadata, Viewport } from "next";
import type { FunctionComponent, PropsWithChildren } from "react";

export const metadata: Metadata = {
  description: "Portfolio site for Jonathan Tucker",
  title: "frontendian",
};

export const viewport: Viewport = {
  themeColor: "#000000",
};

const Layout: FunctionComponent<PropsWithChildren> = ({ children }) => (
  <html lang="en">
    <body>{children}</body>
  </html>
);

export default Layout;
