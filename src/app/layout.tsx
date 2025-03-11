import "./globals.css";
import { type Metadata, type Viewport } from "next";
import { type FunctionComponent, type PropsWithChildren } from "react";

export const metadata: Metadata = {
  description: "Portfolio site for Jonathan Tucker",
  title: "frontendian",
};
export const viewport: Viewport = {
  themeColor: "#000000",
};

const Layout: FunctionComponent<PropsWithChildren> = ({ children }) => children;

export default Layout;
