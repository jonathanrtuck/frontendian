"use client";

import { useStore } from "@/store";
import type { IconComponent } from "@/types";
import type { FunctionComponent, PropsWithChildren } from "react";
import { useCallback, useEffect, useId, useRef, useState } from "react";
import type { EmptyObject } from "type-fest";

// @see https://refine.dev/blog/react-createportal/#mismatch-between-location-in-the-dom-and-event-bubbling
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
  const [tabIndex, setTabIndex] = useState<-1 | 0>(-1);
  const id = `menuitem-${useId()}`;
  const expanded = expandedMenuitemIds.includes(id);
  const getMenubarHasFocus = useCallback(
    () =>
      rootRef.current
        ?.closest<HTMLElement>('[role="menubar"]')
        ?.matches(":focus-within") ?? false,
    []
  );
  const getTopMenuitem = useCallback(
    () => rootRef.current?.closest<HTMLElement>('[role="menubar"] > .menuitem'),
    []
  );
  const getIsTopMenuitem = useCallback(
    () => rootRef.current?.parentElement?.role === "menubar",
    []
  );
  const getIsFirstMenuitem = useCallback(
    () => rootRef.current?.matches(":first-of-type"),
    []
  );
  const getChildMenuitems = useCallback(
    () =>
      Array.from(
        rootRef.current?.querySelectorAll<HTMLElement>(
          ":scope > .menu > .menuitem"
        ) ?? []
      ),
    []
  );
  const getButton = useCallback(
    (menuitem?: HTMLElement | null) =>
      menuitem?.querySelector<HTMLElement>(':scope > [role="menuitem"]'),
    []
  );
  const collapseAll = () => {
    if (expandedMenuitemIds.length !== 0) {
      collapseMenuitem({ id: expandedMenuitemIds.at(0)! });
      getButton(getTopMenuitem())?.focus();
    }
  };

  useEffect(
    () =>
      getIsTopMenuitem()
        ? setTabIndex(
            expanded || (getIsFirstMenuitem() && !getMenubarHasFocus()) ? 0 : -1
          )
        : undefined,
    [
      expanded,
      expandedMenuitemIds,
      getIsFirstMenuitem,
      getIsTopMenuitem,
      getMenubarHasFocus,
    ]
  );
  useEffect(
    () =>
      expanded ? getButton(getChildMenuitems().at(0))?.focus() : undefined,
    [expanded, getButton, getChildMenuitems]
  );

  if ("separator" in props) {
    return (
      <li
        className="menuitem"
        onClick={collapseAll}
        onMouseEnter={({ currentTarget }) =>
          document.hasFocus() && getMenubarHasFocus()
            ? currentTarget.focus()
            : undefined
        }
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
  const haspopup = Boolean(children);

  return (
    <li
      className="menuitem"
      id={id}
      onBlur={({ currentTarget, relatedTarget }) => {
        if (
          haspopup &&
          document.hasFocus() &&
          !currentTarget?.contains(relatedTarget)
        ) {
          collapseMenuitem({ id });
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
            expandMenuitem({ id });
          } else {
            collapseAll();
          }
        }}
        onKeyDown={(e) => {
          // @todo
        }}
        onMouseEnter={({ currentTarget }) => {
          if (document.hasFocus() && getMenubarHasFocus()) {
            if (getIsTopMenuitem()) {
              // @todo currentTarget.focus(); if mac-os-classic
            } else if (haspopup) {
              expandMenuitem({ id });
            } else {
              currentTarget.focus();
            }
          }
        }}
        onPointerDown={(e) =>
          haspopup && expanded ? e.preventDefault() : undefined
        }
        role={
          (type === "checkbox" && "menuitemcheckbox") ||
          (type === "radio" && "menuitemradio") ||
          "menuitem"
        }
        tabIndex={tabIndex}
        type="button">
        {Icon ? <Icon /> : null}
        {title ? <label>{title}</label> : null}
      </button>
      {children}
    </li>
  );
};

Menuitem.displayName = "Menuitem";
