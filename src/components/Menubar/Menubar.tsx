import { FunctionComponent, PropsWithChildren } from "react";

import styles from "./MenuBar.module.css";

export const MenuBar: FunctionComponent<
  PropsWithChildren<{
    orientation: "horizontal" | "vertical";
  }>
> = ({ children, orientation }) => (
  <menu aria-orientation={orientation} className={styles.root} role="menubar">
    {children}
  </menu>
);
