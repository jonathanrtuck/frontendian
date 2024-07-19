import { FunctionComponent, PropsWithChildren } from "react";

import styles from "./Menu.module.css";

export const Menu: FunctionComponent<
  PropsWithChildren<{
    open: boolean;
  }>
> = ({ children, open }) => (
  <menu aria-orientation="vertical" className={styles.root} role="menu">
    {children}
  </menu>
);
