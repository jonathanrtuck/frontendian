import type { Metadata } from "next";
import { FunctionComponent, PropsWithChildren } from "react";

import "./globals.css";

export const metadata: Metadata = {
  description: "Portfolio site for Jonathan Tucker",
  title: "frontendian",
};

const Layout: FunctionComponent<PropsWithChildren> = ({ children }) => (
  <html lang="en">
    <body>{children}</body>
  </html>
);

export default Layout;
