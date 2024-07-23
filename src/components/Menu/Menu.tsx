import clsx from "clsx";
import { forwardRef, HTMLAttributes, PropsWithChildren } from "react";

import { MenuContext } from "contexts";

import styles from "./Menu.module.css";

export type MenuProps = PropsWithChildren<HTMLAttributes<HTMLMenuElement>> &
  (
    | ({
        bar: true;
      } & (
        | {
            horizontal: true;
          }
        | {
            vertical: true;
          }
      ))
    | {}
  );

export const Menu = forwardRef<HTMLElement, MenuProps>(
  ({ children, className, ...restProps }, ref) => {
    const isBar = "bar" in restProps;
    const isHorizontal = "horizontal" in restProps;
    const isVertical = "vertical" in restProps;
    const props = Object.assign({}, restProps, {
      bar: undefined,
      horizontal: undefined,
      vertical: undefined,
    });

    return (
      <menu
        {...props}
        aria-orientation={
          isBar ? (isHorizontal ? "horizontal" : "vertical") : undefined
        }
        className={clsx(className, styles.root, {
          [styles.bar]: isBar,
          [styles.horizontal]: isHorizontal,
          [styles.vertical]: isVertical,
        })}
        ref={ref}
        role={isBar ? "menubar" : "menu"}>
        <MenuContext.Provider
          value={{
            isBar,
            isHorizontal,
            isOpen: false,
            isVertical,
          }}>
          {children}
        </MenuContext.Provider>
      </menu>
    );
  }
);
