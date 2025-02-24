"use client";

import clsx from "clsx";
import type { FunctionComponent, PropsWithChildren } from "react";
import { useState } from "react";
import type { EmptyObject } from "type-fest";

// @see https://www.w3.org/WAI/ARIA/apg/patterns/menubar/
export const Menu: FunctionComponent<
  PropsWithChildren<
    {
      id?: string;
    } & (
      | {
          bar: true;
          collapsible?: boolean;
          horizontal?: boolean;
        }
      | EmptyObject
    )
  >
> = ({ children, id, ...props }) => {
  const [isCollapsed, setIsCollapsed] = useState<boolean>(false);

  return (
    <>
      {"collapsible" in props && props.collapsible ? (
        <button
          aria-hidden
          className="menu-button"
          onClick={() => setIsCollapsed((prevState) => !prevState)}
          type="button"
        />
      ) : null}
      <menu
        aria-orientation={
          "horizontal" in props && props.horizontal ? "horizontal" : "vertical"
        }
        className={clsx("menu", { isCollapsed })}
        draggable={false}
        id={id}
        role={"bar" in props && props.bar ? "menubar" : "menu"}>
        {children}
      </menu>
    </>
  );
};

Menu.displayName = "Menu";
