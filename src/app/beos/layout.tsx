import styles from "./Desktop.module.css";
import clsx from "clsx";
import localFont from "next/font/local";
import type { FunctionComponent, PropsWithChildren } from "react";

const FONT_COURIER_10_PITCH = localFont({
  src: "./Courier10Pitch.otf",
  variable: "--font-family--courier-10-pitch",
});

const Layout: FunctionComponent<PropsWithChildren> = ({ children }) => (
  <html
    className={clsx(styles.theme, FONT_COURIER_10_PITCH.variable)}
    lang="en">
    <body>{children}</body>
  </html>
);

export default Layout;
