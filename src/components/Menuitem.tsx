"use client";

import type { IconComponent } from "@/types";
import type { FunctionComponent, PropsWithChildren } from "react";
import type { RequireAllOrNone } from "type-fest";

export const Menuitem: FunctionComponent<
  {
    Icon?: IconComponent;
    title: string;
  } & (
    | RequireAllOrNone<
        {
          checked?: boolean;
          Icon?: IconComponent;
          disabled?: boolean;
          onClick?(): void;
          type: "checkbox" | "radio";
        },
        "checked" | "type"
      >
    | PropsWithChildren
  )
> = ({ Icon, title, ...props }) => (
  <li
    className="menuitem"
    onClick={"onClick" in props ? props.onClick : undefined}
    role="menuitem">
    <label>
      {Icon ? <Icon /> : null}
      {title}
    </label>
    {"children" in props ? props.children : null}
  </li>
);

Menuitem.displayName = "Menuitem";
