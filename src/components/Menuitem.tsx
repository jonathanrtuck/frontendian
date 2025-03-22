"use client";

import { type IconComponent } from "@/types";
import clsx from "clsx";
import {
  type ButtonHTMLAttributes,
  type ElementType,
  type FunctionComponent,
  type HTMLAttributes,
  Children,
  createElement,
} from "react";

export const Menuitem: FunctionComponent<
  (ButtonHTMLAttributes<HTMLButtonElement> | HTMLAttributes<HTMLElement>) & {
    classes?: Partial<{
      button: string;
      icon: string;
      root: string;
      text: string;
    }>;
    component?: ElementType;
    Icon?: IconComponent;
  } & ({ title: string } | { "aria-label": string })
> = ({
  children,
  classes = {},
  className,
  component,
  Icon,
  role = "menuitem",
  title,
  ...props
}) => {
  const hasPopup = Children.count(children) !== 0;
  const elementType: ElementType =
    component ?? "href" in props ? "a" : "button";
  const button = createElement(
    elementType,
    {
      ...props,
      "aria-haspopup": hasPopup,
      "aria-label": props["aria-label"] ?? title,
      className: clsx("menuitem-button", classes.button),
      role,
      title,
      type:
        elementType === "button" && "type" in props
          ? props.type ?? "button"
          : undefined,
    },
    <>
      {Icon ? <Icon className={clsx("menuitem-icon", classes.icon)} /> : null}
      {title ? (
        <span aria-hidden className={clsx("menuitem-text", classes.text)}>
          {title}
        </span>
      ) : null}
    </>
  );

  return (
    <li className={clsx("menuitem", className, classes.root)} role="none">
      {button}
      {children}
    </li>
  );
};
