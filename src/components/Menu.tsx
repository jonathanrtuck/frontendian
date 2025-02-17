"use client";

import type { FunctionComponent, PropsWithChildren } from "react";

export const Menu: FunctionComponent<
  PropsWithChildren<
    | {
        bar: true;
        horizontal?: boolean;
      }
    | { bar?: false }
  >
> = ({ bar, children, ...props }) => (
  <menu
    aria-orientation={"horizontal" in props ? "horizontal" : "vertical"}
    className="menu"
    role={bar ? "menubar" : "menu"}>
    {children}
  </menu>
);

Menu.displayName = "Menu";
