import clsx from "clsx";
import {
  ForwardRefExoticComponent,
  FunctionComponent,
  HTMLAttributes,
  ReactElement,
  RefAttributes,
  SVGAttributes,
  useContext,
} from "react";

import { MenuContext } from "contexts";

import styles from "./MenuItem.module.css";

export type MenuItemProps = Omit<
  HTMLAttributes<HTMLLIElement>,
  | "aria-disabled"
  | "aria-expanded"
  | "aria-haspopup"
  | "aria-label"
  | "onClick"
  | "role"
  | "tabIndex"
> &
  (
    | {
        Icon?: ForwardRefExoticComponent<
          SVGAttributes<SVGSVGElement> & RefAttributes<SVGSVGElement>
        >;
        children?: ReactElement;
        disabled?: boolean;
        expanded?: boolean;
        onClick?(): void;
        title: string;
      }
    | {
        separator: true;
      }
  );

export const MenuItem: FunctionComponent<MenuItemProps> = ({
  children,
  className,
  title,
  ...restProps
}) => {
  const { isBar, isHorizontal, isOpen, isVertical } = useContext(MenuContext);

  if ("separator" in restProps) {
    const { separator, ...props } = restProps;

    return (
      <li
        {...props}
        className={clsx(className, styles.separator, {
          [styles.bar]: isBar,
          [styles.horizontal]: isHorizontal,
          [styles.vertical]: isVertical,
        })}
        role="separator"
      />
    );
  }

  const { Icon, disabled, expanded, onClick, ...props } = restProps;

  return (
    <li
      {...props}
      aria-disabled={disabled}
      aria-expanded={expanded}
      aria-haspopup={children ? "menu" : undefined}
      aria-label={title}
      className={clsx(className, styles.root, {
        [styles.bar]: isBar,
        [styles.horizontal]: isHorizontal,
        [styles.vertical]: isVertical,
      })}
      onClick={onClick}
      role="menuitem"
      tabIndex={0}>
      {Icon && (
        <Icon aria-hidden="false" className={styles.icon} role="presentation" />
      )}
      <span className={styles.title}>{title}</span>
      {expanded && children}
    </li>
  );
};
