"use client";

import type { FocusEvent, FunctionComponent, PropsWithChildren } from "react";
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

  return (
    <menu
      aria-hidden={bar ? undefined : true} // @todo
      aria-orientation={"horizontal" in props ? "horizontal" : "vertical"}
      className="menu"
      onBlur={(e: FocusEvent<HTMLMenuElement>) => {
        // @todo
      }}
      onFocus={(e: FocusEvent<HTMLMenuElement>) => {
        // @todo
      }}
      role={bar ? "menubar" : "menu"}>
      {children}
    </menu>
  );
};

Menu.displayName = "Menu";
