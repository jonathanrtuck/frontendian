import clsx from "clsx";
import { FunctionComponent, HTMLAttributes, PropsWithChildren } from "react";

import styles from "./MenuBar.module.css";

export const MenuBar: FunctionComponent<
  PropsWithChildren<
    HTMLAttributes<HTMLMenuElement> & {
      orientation: "horizontal" | "vertical";
    }
  >
> = ({ children, className, orientation }) => (
  <menu
    aria-orientation={orientation}
    className={clsx(className, styles.root)}
    role="menubar">
    {children}
  </menu>
);
