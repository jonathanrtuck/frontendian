import styles from "./Desktop.module.css";
import clsx from "clsx";
import localFont from "next/font/local";
import { type FunctionComponent, type PropsWithChildren } from "react";

const FONT_W95FA = localFont({
  src: "./w95fa.woff2",
  variable: "--font-family--w95fa",
});

const Layout: FunctionComponent<PropsWithChildren> = ({ children }) => (
  <html className={clsx(styles.theme, FONT_W95FA.variable)} lang="en">
    <body>{children}</body>
  </html>
);

export default Layout;
