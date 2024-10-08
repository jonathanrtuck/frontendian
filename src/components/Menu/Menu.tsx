import clsx from "clsx";
import {
  FocusEvent,
  forwardRef,
  HTMLAttributes,
  KeyboardEvent,
  PointerEvent,
  PropsWithChildren,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";

import { MenuContext, MenuContextType, MenuitemContext } from "@/contexts";
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
  (
    {
      children,
      className,
      onBlur,
      onFocus,
      onKeyDown,
      onPointerDown,
      ...props
    },
    ref
  ) => {
    const {
      inactivate: parentInactivate,
      isActive: isParentActive,
      isPointer: isParentPointer,
    } = useContext(MenuContext);
    const { isExpanded } = useContext(MenuitemContext);

    const [isActive, setIsActive] = useState<boolean>(false);
    const [isFocusWithin, setIsFocusWithin] = useState<boolean>(false);
    const [isPointer, setIsPointer] = useState<boolean>(false);

    const bar = "bar" in props;
    const horizontal = "horizontal" in props;

    const inactivate = useCallback(() => {
      setIsActive(false);
    }, []);

    const contextValue = useMemo<MenuContextType>(
      () => ({
        inactivate: bar ? inactivate : parentInactivate,
        isActive: bar ? isActive : isParentActive,
        isFocusWithin,
        isPointer: bar ? isPointer : isParentPointer,
        isTop: Boolean(bar),
        orientation: bar && horizontal ? "horizontal" : "vertical",
      }),
      [
        bar,
        horizontal,
        inactivate,
        isActive,
        isFocusWithin,
        isParentActive,
        isParentPointer,
        isPointer,
        parentInactivate,
      ]
    );

    return (
      <menu
        {...removeProps<HTMLAttributes<HTMLMenuElement>>(props, [
          "bar",
          "horizontal",
          "vertical",
        ])}
        aria-hidden={bar ? undefined : !isExpanded}
        aria-orientation={
          bar ? (horizontal ? "horizontal" : "vertical") : undefined
        }
        className={clsx(className, styles.root, {
          [styles.bar]: bar,
          [styles.hidden]: !bar && !isExpanded,
          [styles.horizontal]: horizontal,
          [styles.vertical]: !horizontal,
        })}
        onBlur={(e: FocusEvent<HTMLMenuElement>) => {
          onBlur?.(e);

          if (
            document.hasFocus() &&
            !e.currentTarget?.contains(e.relatedTarget)
          ) {
            setIsActive(false);
            setIsFocusWithin(false);
            setIsPointer(false);
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
            setIsPointer(false);
          }
        }}
        onPointerDown={(e: PointerEvent<HTMLMenuElement>) => {
          onPointerDown?.(e);

          if (bar) {
            setIsPointer(true);
          }
        }}
        ref={ref}
        role={bar ? "menubar" : "menu"}>
        <MenuContext.Provider value={contextValue}>
          {children}
        </MenuContext.Provider>
      </menu>
    );
  }
);

Menu.displayName = "Menu";
