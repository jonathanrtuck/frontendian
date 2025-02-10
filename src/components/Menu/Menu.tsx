"use client";

import "./Menu.theme-beos.css";
import "./Menu.theme-mac-os-classic.css";
import { MenuContext, MenuitemContext } from "@/contexts";
import clsx from "clsx";
import type {
  ContextType,
  DetailedHTMLProps,
  FocusEvent,
  FunctionComponent,
  HTMLAttributes,
  PropsWithChildren,
} from "react";
import { useCallback, useContext, useMemo, useState } from "react";

// @see https://www.w3.org/WAI/ARIA/apg/patterns/menubar/
export const Menu: FunctionComponent<
  PropsWithChildren<
    Omit<
      DetailedHTMLProps<HTMLAttributes<HTMLMenuElement>, HTMLMenuElement>,
      "aria-hidden" | "aria-orientation" | "role"
    > & {
      bar?: boolean;
      horizontal?: boolean;
    }
  >
> = ({ bar, children, className, horizontal, onBlur, onFocus, ...props }) => {
  const { inactivate: parentInactivate, isActive: isParentActive } =
    useContext(MenuContext);
  const { isExpanded } = useContext(MenuitemContext);
  const [isActive, setIsActive] = useState<boolean>(false);
  const [isFocusWithin, setIsFocusWithin] = useState<boolean>(false);
  const inactivate = useCallback(() => setIsActive(false), []);
  const orientation = bar && horizontal ? "horizontal" : "vertical";
  const contextValue = useMemo<ContextType<typeof MenuContext>>(
    () => ({
      inactivate: bar ? inactivate : parentInactivate,
      isActive: bar ? isActive : isParentActive,
      isFocusWithin,
      isTop: Boolean(bar),
      orientation,
    }),
    [
      bar,
      inactivate,
      isActive,
      isFocusWithin,
      isParentActive,
      orientation,
      parentInactivate,
    ]
  );

  return (
    <menu
      {...props}
      aria-hidden={bar ? undefined : !isExpanded}
      aria-orientation={orientation}
      className={clsx("component-menu", className, {
        "visually-hidden": !bar && !isExpanded,
      })}
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
      role={bar ? "menubar" : "menu"}>
      <MenuContext.Provider value={contextValue}>
        {children}
      </MenuContext.Provider>
    </menu>
  );
};

Menu.displayName = "Menu";
