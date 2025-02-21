"use client";

import type { FunctionComponent, PropsWithChildren } from "react";
import type { EmptyObject } from "type-fest";

// @see https://www.w3.org/WAI/ARIA/apg/patterns/menubar/
export const Menu: FunctionComponent<
  PropsWithChildren<
    {
      id?: string;
    } & (
      | {
          bar: true;
          horizontal?: boolean;
        }
      | EmptyObject
    )
  >
> = ({ children, id, ...props }) => (
  <menu
    aria-orientation={
      "horizontal" in props && props.horizontal ? "horizontal" : "vertical"
    }
    className="menu"
    draggable={false}
    id={id}
    role={"bar" in props && props.bar ? "menubar" : "menu"}>
    {children}
  </menu>
);

Menu.displayName = "Menu";
