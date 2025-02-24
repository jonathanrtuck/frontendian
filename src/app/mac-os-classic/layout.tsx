import styles from "./Desktop.module.css";
import clsx from "clsx";
import localFont from "next/font/local";
import type { FunctionComponent, PropsWithChildren } from "react";

const FONT_CHARCOAL = localFont({
  src: "./Charcoal.ttf",
  variable: "--font-family--charcoal",
});

const Layout: FunctionComponent<PropsWithChildren> = ({ children }) => (
  <html className={clsx(styles.theme, FONT_CHARCOAL.variable)} lang="en">
    <body>{children}</body>
  </html>
);

export default Layout;
