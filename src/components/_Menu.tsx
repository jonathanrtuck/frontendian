"use client";

import { MenuContext, MenuitemContext } from "@/contexts";
import clsx from "clsx";
import type {
  ContextType,
  DetailedHTMLProps,
  FunctionComponent,
  HTMLAttributes,
  PropsWithChildren,
} from "react";
import {
  useCallback,
  useContext,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";

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
> = ({ bar, children, className, horizontal, ...props }) => {
  const { inactivate: parentInactivate, isActive: isParentActive } =
    useContext(MenuContext);
  const { isExpanded } = useContext(MenuitemContext);
  const rootRef = useRef<HTMLMenuElement>(null);
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

  // @see https://refine.dev/blog/react-createportal/#mismatch-between-location-in-the-dom-and-event-bubbling
  useLayoutEffect(() => {
    const rootElement = rootRef.current;

    if (rootElement) {
      const onFocusIn = (): void => {
        setIsActive(true);
        setIsFocusWithin(true);
      };
      const onFocusOut = (e: FocusEvent): void => {
        if (
          document.hasFocus() &&
          !(e.currentTarget as HTMLMenuElement)?.contains(
            e.relatedTarget as Element
          )
        ) {
          setIsActive(false);
          setIsFocusWithin(false);
        }
      };

      rootElement.addEventListener("focusin", onFocusIn);
      rootElement.addEventListener("focusout", onFocusOut);

      return () => {
        rootElement.removeEventListener("focusin", onFocusIn);
        rootElement.removeEventListener("focusout", onFocusOut);
      };
    }
  }, []);

  return (
    <menu
      {...props}
      aria-expanded={isActive}
      aria-hidden={bar ? undefined : !isExpanded}
      aria-orientation={orientation}
      className={clsx("component-menu", className, {
        "visually-hidden": !bar && !isExpanded,
      })}
      ref={rootRef}
      role={bar ? "menubar" : "menu"}>
      <MenuContext.Provider value={contextValue}>
        {children}
      </MenuContext.Provider>
    </menu>
  );
};

Menu.displayName = "Menu";
