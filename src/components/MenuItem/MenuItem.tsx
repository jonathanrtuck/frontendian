import {
  ForwardRefExoticComponent,
  FunctionComponent,
  PropsWithChildren,
  RefAttributes,
  SVGAttributes,
} from "react";

import styles from "./MenuItem.module.css";

export const MenuItem: FunctionComponent<
  PropsWithChildren<{
    Icon?: ForwardRefExoticComponent<
      SVGAttributes<SVGSVGElement> & RefAttributes<SVGSVGElement>
    >;
    disabled?: boolean;
    expanded?: boolean;
    title: string;
  }>
> = ({ children, disabled, expanded, Icon, title }) => (
  <li
    aria-disabled={disabled}
    aria-expanded={expanded}
    aria-haspopup={children ? "menu" : undefined}
    aria-label={title}
    className={styles.root}
    role="menuitem"
    tabIndex={0}>
    {Icon && (
      <Icon aria-hidden="false" className={styles.icon} role="presentation" />
    )}
    <span className={styles.title}>{title}</span>
    {children}
  </li>
);
