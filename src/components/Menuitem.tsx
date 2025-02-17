"use client";

import type { IconComponent } from "@/types";
import type { FunctionComponent, PropsWithChildren } from "react";
import { useId } from "react";
import type { RequireAllOrNone } from "type-fest";

export const Menuitem: FunctionComponent<
  | ({
      disabled?: boolean;
      Icon?: IconComponent;
      title: string;
    } & (
      | PropsWithChildren
      | RequireAllOrNone<
          {
            checked?: boolean;
            onClick?(): void;
            type: "checkbox" | "radio";
          },
          "checked" | "type"
        >
    ))
  | {
      separator: true;
    }
> = (props) => {
  const id = useId();

  if ("separator" in props) {
    return (
      <li
        className="menuitem"
        onMouseEnter={(e) => {
          // @todo
        }}
        role="separator"
        tabIndex={-1}
      />
    );
  }

  const checked = "checked" in props && props.checked;
  const children = "children" in props ? props.children : undefined;
  const disabled = "disabled" in props && props.disabled;
  const Icon = "Icon" in props ? props.Icon : undefined;
  const onClick = "onClick" in props ? props.onClick : undefined;
  const title = "title" in props ? props.title : undefined;
  const type = "type" in props ? props.type : undefined;
  const haspopup = Boolean(children);

  return (
    <li
      className="menuitem"
      onBlur={(e) => {
        // @todo
      }}
      role="none">
      <button
        aria-checked={type ? checked : undefined}
        aria-disabled={disabled}
        aria-expanded={haspopup ? "false" : undefined} // @todo
        aria-haspopup={haspopup ? "menu" : undefined}
        aria-labelledby={`${id}-title`}
        onClick={onClick}
        onKeyDown={(e) => {
          // @todo
        }}
        onMouseEnter={(e) => {
          // @todo
        }}
        onPointerDown={(e) => {
          // @todo
        }}
        role={
          (type === "checkbox" && "menuitemcheckbox") ||
          (type === "radio" && "menuitemradio") ||
          "menuitem"
        }
        type="button">
        {Icon ? <Icon /> : null}
        {title ? <label id={`${id}-title`}>{title}</label> : null}
      </button>
      {children}
    </li>
  );
};

Menuitem.displayName = "Menuitem";
