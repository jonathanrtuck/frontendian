import clsx from "clsx";
import { FunctionComponent, HTMLAttributes, PropsWithChildren } from "react";

import styles from "./Menu.module.css";

export const Menu: FunctionComponent<
  PropsWithChildren<HTMLAttributes<HTMLMenuElement>>
> = ({ children, className, ...props }) => (
  <menu
    {...props}
    aria-orientation="vertical"
    className={clsx(className, styles.root)}
    role="menu">
    {children}
  </menu>
);
