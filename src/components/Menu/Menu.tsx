import clsx from "clsx";
import {
  FocusEvent,
  forwardRef,
  HTMLAttributes,
  KeyboardEvent,
  PropsWithChildren,
  useContext,
  useImperativeHandle,
  useRef,
  useState,
} from "react";

import { MenuContext } from "@/contexts";
import { removeProps } from "@/utils";

import styles from "./Menu.module.css";

export * from "./components/Menuitem";

export type MenuProps = PropsWithChildren<
  Omit<
    HTMLAttributes<HTMLMenuElement>,
    "aria-hidden" | "aria-orientation" | "role"
  >
> &
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
  ({ children, className, onBlur, onFocus, onKeyDown, ...props }, ref) => {
    const {
      isActive: isParentActive,
      isKeyboardNavigation: isParentKeyboardNavigation,
      setIsActive: setParentIsActive,
    } = useContext(MenuContext);

    const rootRef = useRef<HTMLMenuElement>(null);

    useImperativeHandle(ref, () => rootRef.current as HTMLMenuElement);

    const [isActive, setIsActive] = useState<boolean>(false);
    const [isFocusWithin, setIsFocusWithin] = useState<boolean>(false);
    const [isKeyboardNavigation, setIsKeyboardNavigation] =
      useState<boolean>(false);

    const bar = "bar" in props;
    const horizontal = "horizontal" in props;

    return (
      <menu
        {...removeProps<HTMLAttributes<HTMLMenuElement>>(props, [
          "bar",
          "horizontal",
          "vertical",
        ])}
        aria-hidden={bar ? undefined : !isFocusWithin}
        aria-orientation={
          bar ? (horizontal ? "horizontal" : "vertical") : undefined
        }
        className={clsx(className, styles.root)}
        onBlur={(e: FocusEvent<HTMLMenuElement>) => {
          onBlur?.(e);

          if (
            document.hasFocus() &&
            !e.currentTarget?.contains(e.relatedTarget)
          ) {
            setIsActive(false);
            setIsFocusWithin(false);
          }
        }}
        onFocus={(e: FocusEvent<HTMLMenuElement>) => {
          onFocus?.(e);

          setIsActive(true);
          setIsFocusWithin(true);
        }}
        onKeyDown={(e: KeyboardEvent<HTMLMenuElement>) => {
          onKeyDown?.(e);

          if (bar) {
            setIsKeyboardNavigation(true);
          }
        }}
        ref={rootRef}
        role={bar ? "menubar" : "menu"}>
        <MenuContext.Provider
          value={
            bar
              ? {
                  isActive,
                  isFocusWithin,
                  isKeyboardNavigation,
                  isTop: true,
                  orientation: horizontal ? "horizontal" : "vertical",
                  setIsActive,
                }
              : {
                  isActive: isParentActive,
                  isFocusWithin,
                  isKeyboardNavigation: isParentKeyboardNavigation,
                  isTop: false,
                  orientation: "vertical",
                  setIsActive: setParentIsActive,
                }
          }>
          {children}
        </MenuContext.Provider>
      </menu>
    );
  }
);

Menu.displayName = "Menu";
