import clsx from "clsx";
import {
  Children,
  FocusEvent,
  forwardRef,
  HTMLAttributes,
  isValidElement,
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

    const hasPopup = useMemo<boolean>(
      () =>
        Children.toArray(children)
          .filter(isValidElement)
          .some(({ props }) => "children" in (props as any)),
      [children]
    );
    const contextValue = useMemo<MenuContextType>(
      () => ({
        hasPopup,
        inactivate: bar ? inactivate : parentInactivate,
        isActive: bar ? isActive : isParentActive,
        isFocusWithin,
        isPointer: bar ? isPointer : isParentPointer,
        isTop: Boolean(bar),
        orientation: bar && horizontal ? "horizontal" : "vertical",
      }),
      [
        bar,
        hasPopup,
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
          "visually-hidden": !bar && !isExpanded,
          [styles.bar]: bar,
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
          console.debug("pointer");

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
