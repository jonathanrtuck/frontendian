"use client";

import { useTheme } from "@/hooks";
import { useStore } from "@/store";
import { type IconComponent } from "@/types";
import Link, { LinkProps } from "next/link";
import {
  type AnchorHTMLAttributes,
  type FunctionComponent,
  type PropsWithChildren,
  type UIEvent,
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
} from "react";
import { type EmptyObject } from "type-fest";

// @see https://refine.dev/blog/react-createportal/#mismatch-between-location-in-the-dom-and-event-bubbling
export const Menuitem: FunctionComponent<
  | ({
      disabled?: boolean;
      Icon?: IconComponent;
      title: string;
    } & (
      | PropsWithChildren
      | Pick<LinkProps, "href"> // add others as needed
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
  const theme = useTheme();
  const rootRef = useRef<HTMLLIElement>(null);
  const [tabIndex, setTabIndex] = useState<-1 | 0>(-1);
  const id = `menuitem-${useId()}`;
  const expanded = expandedMenuitemIds.includes(id);
  const getButton = useCallback(
    (menuitem?: HTMLElement | null) =>
      menuitem?.querySelector<HTMLElement>(':scope > [role^="menuitem"]'),
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
  const getIsFirstMenuitem = useCallback(
    () => rootRef.current?.matches(":first-of-type"),
    []
  );
  const getIsParentMenuHorizontal = useCallback(
    () => rootRef.current?.parentElement?.ariaOrientation === "horizontal",
    []
  );
  const getIsTopMenuitem = useCallback(
    () => rootRef.current?.parentElement?.role === "menubar",
    []
  );
  const getMenubarHasFocus = useCallback(
    () =>
      rootRef.current
        ?.closest<HTMLElement>('[role="menubar"]')
        ?.matches(":focus-within") ?? false,
    []
  );
  const getParentMenuitem = useCallback(
    () => rootRef.current?.parentElement?.closest<HTMLElement>(".menuitem"),
    []
  );
  const getSiblingMenuitemButtons = useCallback(
    () =>
      Array.from(
        rootRef.current?.parentElement?.querySelectorAll<HTMLElement>(
          ':scope > .menuitem > [role^="menuitem"]'
        ) ?? []
      ),
    []
  );
  const collapseAll = ({ currentTarget }: UIEvent<HTMLElement>) => {
    if (expandedMenuitemIds.length !== 0) {
      collapseMenuitem({ id: expandedMenuitemIds.at(0)! });
      currentTarget.blur();
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

  const { disabled = false, Icon, title } = props;
  const checked = "checked" in props && props.checked;
  const children = "children" in props ? props.children : undefined;
  const href = "href" in props ? props.href : undefined;
  const type = "type" in props ? props.type : undefined;
  const haspopup = Boolean(children);
  const onClick = (e: UIEvent<HTMLElement>) => {
    if ("onClick" in props && !checked && !disabled) {
      props.onClick?.();
    }
    if (haspopup && !expanded) {
      expandMenuitem({ id });
    } else {
      collapseAll(e);
    }
  };
  const anchorProps: AnchorHTMLAttributes<HTMLAnchorElement> = {
    ["aria-checked"]: type ? checked : undefined,
    ["aria-disabled"]: disabled || undefined,
    ["aria-expanded"]: haspopup ? expanded : undefined,
    ["aria-haspopup"]: haspopup ? "menu" : undefined,
    ["aria-label"]: title,
    children: (
      <>
        {Icon ? <Icon /> : null}
        <label aria-hidden>{title}</label>
      </>
    ),
    className: "menuitem-button",
    onClick,
    onKeyDown: (e) => {
      // @see https://www.w3.org/WAI/ARIA/apg/patterns/menubar/#keyboardinteraction
      switch (e.key) {
        case "ArrowDown":
          if (getIsTopMenuitem() && getIsParentMenuHorizontal()) {
            if (haspopup && !expanded) {
              expandMenuitem({ id });
            }
          } else {
            const siblingMenuitemButtons = getSiblingMenuitemButtons();
            const index = siblingMenuitemButtons.indexOf(e.currentTarget);

            siblingMenuitemButtons
              .at((index + 1) % siblingMenuitemButtons.length)
              ?.focus();
          }
          break;
        case "ArrowLeft":
          if (getIsTopMenuitem()) {
            if (getIsParentMenuHorizontal()) {
              const siblingMenuitemButtons = getSiblingMenuitemButtons();
              const index = siblingMenuitemButtons.indexOf(e.currentTarget);

              siblingMenuitemButtons.at(index - 1)?.focus();
            }
          } else {
            collapseMenuitem({ id: expandedMenuitemIds.at(-1)! });

            const parentMenuitem = getParentMenuitem();
            const grandparentMenu = parentMenuitem?.parentElement;

            if (grandparentMenu?.ariaOrientation === "horizontal") {
              const parentMenuitemButtons = Array.from(
                grandparentMenu?.querySelectorAll<HTMLElement>(
                  ":scope > .menuitem > button"
                ) ?? []
              );
              const parentMenuitemButton = getButton(parentMenuitem);
              const parentIndex = parentMenuitemButton
                ? parentMenuitemButtons.indexOf(parentMenuitemButton)
                : -1;

              parentMenuitemButtons.at(parentIndex - 1)?.focus();
            } else {
              getButton(getParentMenuitem())?.focus();
            }
          }
          break;
        case "ArrowRight":
          if (getIsTopMenuitem()) {
            if (getIsParentMenuHorizontal()) {
              const siblingMenuitemButtons = getSiblingMenuitemButtons();
              const index = siblingMenuitemButtons.indexOf(e.currentTarget);

              siblingMenuitemButtons
                .at((index + 1) % siblingMenuitemButtons.length)
                ?.focus();
            } else if (haspopup && !expanded) {
              expandMenuitem({ id });
            }
          } else {
            if (haspopup) {
              if (!expanded) {
                expandMenuitem({ id });
              }
            } else {
              const parentMenuitem = getParentMenuitem();
              const grandparentMenu = parentMenuitem?.parentElement;

              if (grandparentMenu?.ariaOrientation === "horizontal") {
                const parentMenuitemButtons = Array.from(
                  grandparentMenu?.querySelectorAll<HTMLElement>(
                    ":scope > .menuitem > button"
                  ) ?? []
                );
                const parentMenuitemButton = getButton(parentMenuitem);
                const parentIndex = parentMenuitemButton
                  ? parentMenuitemButtons.indexOf(parentMenuitemButton)
                  : -1;

                parentMenuitemButtons
                  .at((parentIndex + 1) % parentMenuitemButtons.length)
                  ?.focus();
              }
            }
          }
          break;
        case "ArrowUp":
          if (getIsTopMenuitem() && getIsParentMenuHorizontal()) {
            if (haspopup && !expanded) {
              expandMenuitem({ id });
            }
          } else {
            const siblingMenuitemButtons = getSiblingMenuitemButtons();
            const index = siblingMenuitemButtons.indexOf(e.currentTarget);

            siblingMenuitemButtons.at(index - 1)?.focus();
          }
          break;
        case "Enter":
        case " ":
          e.preventDefault();
          onClick(e);
          break;
        case "Escape":
          e.preventDefault();
          getButton(getParentMenuitem())?.focus();
          collapseMenuitem({ id: expandedMenuitemIds.at(-1)! });
          break;
      }
    },
    onMouseEnter: ({ currentTarget }) => {
      if (document.hasFocus() && getMenubarHasFocus()) {
        if (getIsTopMenuitem()) {
          if (theme === "mac-os-classic") {
            expandMenuitem({ id });
          }
        } else if (haspopup) {
          expandMenuitem({ id });
        } else {
          currentTarget.focus();
        }
      }
    },
    onPointerDown: (e) =>
      haspopup && expanded ? e.preventDefault() : undefined,
    role:
      (type === "checkbox" && "menuitemcheckbox") ||
      (type === "radio" && "menuitemradio") ||
      "menuitem",
    tabIndex,
  };

  return (
    <li
      className="menuitem"
      id={id}
      onBlur={
        haspopup
          ? ({ currentTarget, relatedTarget }) =>
              document.hasFocus() && !currentTarget?.contains(relatedTarget)
                ? collapseMenuitem({ id })
                : undefined
          : undefined
      }
      ref={rootRef}
      role="none">
      {href ? (
        <Link {...anchorProps} href={href} scroll={false} />
      ) : (
        <a {...anchorProps} />
      )}
      {children}
    </li>
  );
};
