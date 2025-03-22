"use client";

import { type FunctionComponent, type MenuHTMLAttributes } from "react";

export const Menu: FunctionComponent<MenuHTMLAttributes<HTMLElement>> = ({
  children,
  popover = "auto",
  ...props
}) => (
  <menu
    {...props}
    onClick={(e) => {
      let parentElement: HTMLElement | null = e.currentTarget;

      while (parentElement) {
        if (parentElement.popover) {
          parentElement.hidePopover();
        }

        parentElement = parentElement.parentElement;
      }

      props.onClick?.(e);
    }}
    popover={popover}
    ref={(node) =>
      node?.setAttribute(
        "id",
        node?.previousElementSibling?.getAttribute("popovertarget") ?? ""
      )
    }>
    {children}
  </menu>
);
