"use client";

import type { FunctionComponent, PropsWithChildren } from "react";
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
  const bar = "bar" in props && props.bar;
  const horizontal = "horizontal" in props && props.horizontal;

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
      role={bar ? "menubar" : "menu"}>
      {children}
    </menu>
  );
};

Menu.displayName = "Menu";
