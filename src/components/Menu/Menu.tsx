import clsx from "clsx";
import {
  FocusEvent,
  forwardRef,
  HTMLAttributes,
  KeyboardEvent,
  MouseEvent,
  PropsWithChildren,
  useImperativeHandle,
  useRef,
  useState,
} from "react";

import { MenubarContext } from "@/contexts";
import { getChildMenuitemToFocus, removeProps } from "@/utils";

import styles from "./Menu.module.css";

export * from "./components/Menuitem";

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

// @see https://www.w3.org/WAI/ARIA/apg/patterns/menubar/
export const Menu = forwardRef<HTMLMenuElement, MenuProps>(
  (
    { children, className, onBlur, onClick, onFocus, onKeyDown, ...props },
    ref
  ) => {
    const rootRef = useRef<HTMLMenuElement>(null);

    useImperativeHandle(ref, () => rootRef.current as HTMLMenuElement);

    const [isFocusWithin, setIsFocusWithin] = useState<boolean>(false);

    const bar = "bar" in props;
    const horizontal = "horizontal" in props;

    return (
      <menu
        {...removeProps(props, ["bar", "horizontal", "vertical"])}
        aria-hidden={bar ? undefined : !isFocusWithin}
        aria-orientation={
          bar ? (horizontal ? "horizontal" : "vertical") : undefined
        }
        className={clsx(className, styles.root)}
        onBlur={(e: FocusEvent<HTMLMenuElement>) => {
          onBlur?.(e);

          if (
            !rootRef.current?.contains(
              e.relatedTarget ?? document.activeElement
            )
          ) {
            setIsFocusWithin(false);
          }
        }}
        onClick={
          bar
            ? (e: MouseEvent<HTMLMenuElement>) => {
                onClick?.(e);

                const menuitem = (e.target as HTMLElement).closest(
                  '[role^="menuitem"]'
                );
                const hasPopup =
                  menuitem?.matches('[aria-haspopup="menu"]') ?? false;
                const isExpanded = menuitem?.matches('[aria-expanded="true"]');

                if (!hasPopup || isExpanded) {
                  getChildMenuitemToFocus(rootRef.current)?.focus();

                  setIsFocusWithin(false);
                }
              }
            : onClick
        }
        onFocus={(e: FocusEvent<HTMLMenuElement>) => {
          onFocus?.(e);

          /**
           * this conditional is needed to handle a case in which the menubar
           * has focus within but `isFocusWithin` is `false`, and the browser
           * window loses then regains focus, firing another focus event; where
           * we want to keep the same `isFocusWithin` state
           */
          if (bar === (rootRef.current?.contains(e.relatedTarget) ?? false)) {
            setIsFocusWithin(true);
          }
        }}
        onKeyDown={
          bar
            ? (e: KeyboardEvent<HTMLMenuElement>) => {
                onKeyDown?.(e);

                if (e.key === "Enter" || e.key === " ") {
                  // @todo
                }
              }
            : onKeyDown
        }
        ref={rootRef}
        role={bar ? "menubar" : "menu"}>
        {bar ? (
          <MenubarContext.Provider value={{ isFocusWithin }}>
            {children}
          </MenubarContext.Provider>
        ) : (
          children
        )}
      </menu>
    );
  }
);

Menu.displayName = "Menu";
