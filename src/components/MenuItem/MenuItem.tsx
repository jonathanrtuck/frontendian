import clsx from "clsx";
import {
  ForwardRefExoticComponent,
  FunctionComponent,
  HTMLAttributes,
  PropsWithChildren,
  RefAttributes,
  SVGAttributes,
} from "react";

import styles from "./MenuItem.module.css";

export const MenuItem: FunctionComponent<
  PropsWithChildren<
    HTMLAttributes<HTMLLIElement> & {
      Icon?: ForwardRefExoticComponent<
        SVGAttributes<SVGSVGElement> & RefAttributes<SVGSVGElement>
      >;
      disabled?: boolean;
      expanded?: boolean;
      title: string;
    }
  >
> = ({ children, className, disabled, expanded, Icon, title, ...props }) => (
  <li
    {...props}
    aria-disabled={disabled}
    aria-expanded={expanded}
    aria-haspopup={children ? "menu" : undefined}
    aria-label={title}
    className={clsx(className, styles.root)}
    role="menuitem"
    tabIndex={0}>
    {Icon && (
      <Icon aria-hidden="false" className={styles.icon} role="presentation" />
    )}
    <span className={styles.title}>{title}</span>
    {expanded && children}
  </li>
);
