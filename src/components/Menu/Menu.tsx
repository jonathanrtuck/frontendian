import clsx from "clsx";
import {
  forwardRef,
  HTMLAttributes,
  PropsWithChildren,
  useContext,
  useImperativeHandle,
  useMemo,
  useRef,
} from "react";

import { MenuContext, MenuContextValue, MenuitemContext } from "@/contexts";

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
    const { expanded } = useContext(MenuitemContext);

    const rootRef = useRef<HTMLMenuElement>(null);

    useImperativeHandle(ref, () => rootRef.current as HTMLElement);

    const bar = "bar" in restProps;
    const horizontal = "horizontal" in restProps;
    const vertical = "vertical" in restProps;
    const props = Object.assign({}, restProps, {
      bar: undefined,
      horizontal: undefined,
      vertical: undefined,
    });

    const menuContextValue = useMemo<MenuContextValue>(
      () => ({
        bar,
        horizontal,
        ref: rootRef,
        vertical,
      }),
      [bar, horizontal, vertical]
    );

    return (
      <menu
        {...props}
        aria-orientation={
          bar ? (horizontal ? "horizontal" : "vertical") : undefined
        }
        className={clsx(className, styles.root, {
          [styles.bar]: bar,
          [styles.horizontal]: horizontal,
          [styles.vertical]: vertical,
        })}
        hidden={!bar && !expanded}
        ref={rootRef}
        role={bar ? "menubar" : "menu"}>
        <MenuContext.Provider value={menuContextValue}>
          {children}
        </MenuContext.Provider>
      </menu>
    );
  }
);

Menu.displayName = "Menu";
