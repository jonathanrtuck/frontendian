"use client";

import { useStore } from "@/store";
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
  const id = `menuitem-${useId()}`;
  const collapseMenuitem = useStore((store) => store.collapseMenuitem);
  const expandedMenuitemIds = useStore((store) => store.expandedMenuitemIds);
  const expandMenuitem = useStore((store) => store.expandMenuitem);
  const onActivate = () => {
    if (!checked && !disabled) {
      onClick?.();
    }

    if (haspopup && !expanded) {
      // @todo set tabIndex
      expandMenuitem({ id });
      // @todo focus first child menuitem
    } else if (expandedMenuitemIds.length !== 0) {
      collapseMenuitem({ id: expandedMenuitemIds.at(0)! });
      // @todo focus top menuitem
    }
  };

  if ("separator" in props) {
    return (
      <li
        className="menuitem"
        onClick={onActivate}
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
  const expanded = expandedMenuitemIds.includes(id);

  return (
    <li
      className="menuitem"
      id={id}
      onBlur={(e) => {
        if (
          haspopup &&
          document.hasFocus() &&
          !e.currentTarget?.contains(e.relatedTarget)
        ) {
          collapseMenuitem({ id });

          /*
          if (isTop) {
            setTabIndex(-1);
          }
          */
        }
      }}
      role="none">
      <button
        aria-checked={type ? checked : undefined}
        aria-disabled={disabled || undefined}
        aria-expanded={haspopup ? expanded : undefined}
        aria-haspopup={haspopup ? "menu" : undefined}
        onClick={onActivate}
        onKeyDown={(e) => {
          // @todo
        }}
        onMouseEnter={(e) => {
          // @todo
        }}
        onPointerDown={(e) =>
          haspopup && expanded ? e.preventDefault() : undefined
        }
        role={
          (type === "checkbox" && "menuitemcheckbox") ||
          (type === "radio" && "menuitemradio") ||
          "menuitem"
        }
        type="button">
        {Icon ? <Icon /> : null}
        {title ? <label>{title}</label> : null}
      </button>
      {children}
    </li>
  );
};

Menuitem.displayName = "Menuitem";
