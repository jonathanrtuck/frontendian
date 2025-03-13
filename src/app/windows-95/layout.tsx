import styles from "./Desktop.module.css";
import clsx from "clsx";
import localFont from "next/font/local";
import { type FunctionComponent, type PropsWithChildren } from "react";

const MS_SANS_SERIF = localFont({
  src: "./MSSansSerif.ttf",
  variable: "--font-family--ms-sans-serif",
});

const Layout: FunctionComponent<PropsWithChildren> = ({ children }) => (
  <html className={clsx(styles.theme, MS_SANS_SERIF.variable)} lang="en">
    <body>{children}</body>
  </html>
);

export default Layout;
