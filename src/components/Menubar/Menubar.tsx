import clsx from "clsx";
import { forwardRef, HTMLAttributes, PropsWithChildren } from "react";

import styles from "./MenuBar.module.css";

export const MenuBar = forwardRef<
  HTMLElement,
  PropsWithChildren<
    HTMLAttributes<HTMLMenuElement> & {
      orientation: "horizontal" | "vertical";
    }
  >
>(({ children, className, orientation }, ref) => (
  <menu
    aria-orientation={orientation}
    className={clsx(className, styles.root)}
    ref={ref}
    role="menubar">
    {children}
  </menu>
));
