"use client";

import type { FunctionComponent, PropsWithChildren } from "react";
import type { EmptyObject } from "type-fest";

// @see https://www.w3.org/WAI/ARIA/apg/patterns/menubar/
export const Menu: FunctionComponent<
  PropsWithChildren<
    | {
        bar: true;
        horizontal?: boolean;
      }
    | EmptyObject
  >
> = ({ children, ...props }) => (
  <menu
    aria-orientation={
      "horizontal" in props && props.horizontal ? "horizontal" : "vertical"
    }
    className="menu"
    draggable={false}
    role={"bar" in props && props.bar ? "menubar" : "menu"}>
    {children}
  </menu>
);

Menu.displayName = "Menu";
