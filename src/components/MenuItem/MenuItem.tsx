import clsx from "clsx";
import {
  ForwardRefExoticComponent,
  FunctionComponent,
  HTMLAttributes,
  ReactElement,
  RefAttributes,
  SVGAttributes,
  useContext,
  useId,
} from "react";

import { MenuContext } from "@/contexts";

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
> & {
  classes?: {
    icon?: string;
    root?: string;
    title?: string;
  };
} & (
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
  classes,
  title,
  ...restProps
}) => {
  const { isBar, isHorizontal, isOpen, isVertical } = useContext(MenuContext);

  const id = useId();

  if ("separator" in restProps) {
    const { separator, ...props } = restProps;

    return (
      <li
        {...props}
        className={clsx(className, classes?.root, styles.separator, {
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
      aria-labelledby={`${id}-title`}
      className={clsx(className, classes?.root, styles.root, {
        [styles.bar]: isBar,
        [styles.horizontal]: isHorizontal,
        [styles.vertical]: isVertical,
      })}
      onClick={() => {
        if (!disabled) {
          if (children) {
            //
            console.debug("open…");
          }

          onClick?.();
        }
      }}
      role="menuitem"
      tabIndex={0}>
      {Icon && (
        <Icon aria-hidden className={clsx(classes?.icon, styles.icon)} />
      )}
      <span className={clsx(classes?.title, styles.title)} id={`${id}-title`}>
        {title}
      </span>
      {children}
    </li>
  );
};
