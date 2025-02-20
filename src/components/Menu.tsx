"use client";

import type { FunctionComponent, PropsWithChildren } from "react";
import { useLayoutEffect, useRef } from "react";
import type { EmptyObject } from "type-fest";

export const Menu: FunctionComponent<
  PropsWithChildren<
    | {
        bar: true;
        horizontal?: boolean;
      }
    | EmptyObject
  >
> = ({ children, ...props }) => {
  const rootRef = useRef<HTMLLIElement>(null);
  const bar = "bar" in props && props.bar;
  const horizontal = "horizontal" in props && props.horizontal;

  // @see https://refine.dev/blog/react-createportal/#mismatch-between-location-in-the-dom-and-event-bubbling
  useLayoutEffect(() => {
    const rootElement = rootRef.current;

    if (rootElement) {
      const onFocusIn = () => {
        // @todo
      };
      const onFocusOut = ({ currentTarget, relatedTarget }: FocusEvent) => {
        if (
          document.hasFocus() &&
          !(currentTarget as HTMLMenuElement)?.contains(
            relatedTarget as Element
          )
        ) {
          // @todo
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
      aria-orientation={horizontal ? "horizontal" : "vertical"}
      className="menu"
      draggable={false}
      onBlur={(e) => {
        // @todo
      }}
      onFocus={(e) => {
        // @todo
      }}
      ref={rootRef}
      role={bar ? "menubar" : "menu"}>
      {children}
    </menu>
  );
};

Menu.displayName = "Menu";
