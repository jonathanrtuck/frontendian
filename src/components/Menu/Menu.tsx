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

import styles from "./Menu.module.css";

const getMenuitemToFocus = (
  element: HTMLElement | null
): HTMLElement | undefined => {
  const menuitems = Array.from<HTMLElement>(
    element?.querySelectorAll(':scope > [role^="menuitem"]') ?? []
  );

  return (
    menuitems.find((menuitem) =>
      menuitem.matches(':not([aria-checked="true"], [aria-disabled="true"])')
    ) ?? menuitems[0]
  );
};

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
    { children, className, onBlur, onClick, onFocus, onKeyDown, ...restProps },
    ref
  ) => {
    const rootRef = useRef<HTMLMenuElement>(null);

    useImperativeHandle(ref, () => rootRef.current as HTMLMenuElement);

    const [isFocusWithin, setIsFocusWithin] = useState<boolean>(false);

    const bar = "bar" in restProps;
    const horizontal = "horizontal" in restProps;
    const props = {
      ...restProps,
      bar: undefined,
      horizontal: undefined,
      open: undefined,
      vertical: undefined,
    };

    return (
      <menu
        {...props}
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
                  getMenuitemToFocus(rootRef.current)?.focus();

                  setIsFocusWithin(false);
                }
              }
            : onClick
        }
        onFocus={(e: FocusEvent<HTMLMenuElement>) => {
          onFocus?.(e);

          setIsFocusWithin(true);
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
