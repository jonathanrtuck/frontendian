"use client";

import type { FunctionComponent, PropsWithChildren } from "react";
import { useRef } from "react";
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
  return (
    <menu
      aria-orientation={horizontal ? "horizontal" : "vertical"}
      className="menu"
      draggable={false}
      ref={rootRef}
      role={bar ? "menubar" : "menu"}>
      {children}
    </menu>
  );
};

Menu.displayName = "Menu";
