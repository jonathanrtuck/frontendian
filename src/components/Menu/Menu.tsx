"use client";

import { MenuContext, MenuitemContext } from "@/contexts";
import clsx from "clsx";
import type {
  ContextType,
  DetailedHTMLProps,
  FocusEvent,
  FunctionComponent,
  HTMLAttributes,
  KeyboardEvent,
  PointerEvent,
  PropsWithChildren,
} from "react";
import {
  Children,
  isValidElement,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";

// @see https://www.w3.org/WAI/ARIA/apg/patterns/menubar/
export const Menu: FunctionComponent<
  PropsWithChildren<
    Omit<
      DetailedHTMLProps<HTMLAttributes<HTMLMenuElement>, HTMLMenuElement>,
      "aria-hidden" | "aria-orientation" | "role"
    > & {
      horizontal?: boolean;
      vertical?: boolean;
      bar?: boolean;
    }
  >
> = ({
  bar,
  children,
  className,
  horizontal,
  onBlur,
  onFocus,
  onKeyDown,
  onPointerDown,
  ref,
  vertical,
  ...props
}) => {
  const {
    inactivate: parentInactivate,
    isActive: isParentActive,
    isPointer: isParentPointer,
  } = useContext(MenuContext);
  const { isExpanded } = useContext(MenuitemContext);
  const [isActive, setIsActive] = useState<boolean>(false);
  const [isFocusWithin, setIsFocusWithin] = useState<boolean>(false);
  const [isPointer, setIsPointer] = useState<boolean>(false);
  const inactivate = useCallback(() => setIsActive(false), []);
  // if has grandchildren (Menu -> Menuitem -> Menu)
  const hasPopup = useMemo<boolean>(
    () =>
      Children.toArray(children)
        .filter(isValidElement<PropsWithChildren>)
        .some(({ props }) =>
          Children.toArray(props.children)
            .filter(isValidElement<PropsWithChildren>)
            .some(({ props }) => Children.count(props.children) !== 0)
        ),
    [children]
  );
  const contextValue = useMemo<ContextType<typeof MenuContext>>(
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
      {...props}
      aria-hidden={bar ? undefined : !isExpanded}
      aria-orientation={
        bar ? (horizontal ? "horizontal" : "vertical") : undefined
      }
      className={clsx(className, {
        "visually-hidden": !bar && !isExpanded,
        // [styles.bar[currentThemeId]]: bar,
        // [styles.horizontal[currentThemeId]]: horizontal,
        // [styles.vertical[currentThemeId]]: !horizontal,
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
      role={bar ? "menubar" : "menu"}>
      <MenuContext.Provider value={contextValue}>
        {children}
      </MenuContext.Provider>
    </menu>
  );
};

Menu.displayName = "Menu";
