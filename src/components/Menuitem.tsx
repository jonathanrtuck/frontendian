"use client";

import { useStore } from "@/store";
import type { IconComponent } from "@/types";
import type { FunctionComponent, PropsWithChildren } from "react";
import { useId, useRef } from "react";
import type { EmptyObject } from "type-fest";

export const Menuitem: FunctionComponent<
  | ({
      disabled?: boolean;
      Icon?: IconComponent;
      title: string;
    } & (
      | PropsWithChildren
      | ({
          onClick?(): void;
        } & (
          | {
              checked?: boolean;
              type: "checkbox" | "radio";
            }
          | EmptyObject
        ))
    ))
  | {
      separator: true;
    }
> = (props) => {
  const collapseMenuitem = useStore((store) => store.collapseMenuitem);
  const expandedMenuitemIds = useStore((store) => store.expandedMenuitemIds);
  const expandMenuitem = useStore((store) => store.expandMenuitem);
  const rootRef = useRef<HTMLLIElement>(null);
  const id = `menuitem-${useId()}`;
  const isTop = rootRef.current?.parentElement?.role === "menubar";
  const getTopMenuitem = () =>
    rootRef.current?.closest<HTMLElement>('[role="menubar"] > .menuitem');
  const collapseAll = () => {
    if (expandedMenuitemIds.length !== 0) {
      collapseMenuitem({ id: expandedMenuitemIds.at(0)! });
      getTopMenuitem()
        ?.querySelector<HTMLElement>(':scope > [role="menuitem"]')
        ?.focus();
    }
  };

  if ("separator" in props) {
    return (
      <li
        className="menuitem"
        onClick={collapseAll}
        onMouseEnter={(e) => {
          // @todo
        }}
        ref={rootRef}
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
  const expanded = expandedMenuitemIds.includes(id);
  const haspopup = Boolean(children);

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

          if (isTop) {
            // setTabIndex(-1);
          }
        }
      }}
      ref={rootRef}
      role="none">
      <button
        aria-checked={type ? checked : undefined}
        aria-disabled={disabled || undefined}
        aria-expanded={haspopup ? expanded : undefined}
        aria-haspopup={haspopup ? "menu" : undefined}
        onClick={() => {
          if (!checked && !disabled) {
            onClick?.();
          }

          if (haspopup && !expanded) {
            // @todo set tabIndex
            expandMenuitem({ id });
            // @todo focus first child menuitem
          } else {
            collapseAll();
          }
        }}
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
