"use client";

import { type IconComponent } from "@/types";
import clsx from "clsx";
import {
  type ButtonHTMLAttributes,
  type ElementType,
  type FunctionComponent,
  type HTMLAttributes,
  type ToggleEvent,
  Children,
  createElement,
  useId,
  useState,
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
    standalone?: boolean;
  } & ({ title: string } | { "aria-label": string } | { role: "separator" })
> = ({
  children,
  classes = {},
  className,
  component,
  Icon,
  popoverTarget,
  role = "menuitem",
  standalone,
  title,
  ...props
}) => {
  const id = useId();
  const [expanded, setExpanded] = useState<boolean>(
    props["aria-expanded"] === true || props["aria-expanded"] === "true"
  );
  const hasPopup = Children.count(children) !== 0;
  const elementType: ElementType =
    component ?? "href" in props ? "a" : "button";
  const isSeparator = role === "separator";

  return createElement(
    standalone ? "div" : "li",
    {
      className: clsx(classes.root, isSeparator && className),
      onToggle: isSeparator
        ? undefined
        : ({ newState, target }: ToggleEvent) =>
            "id" in target && target.id === id
              ? setExpanded(newState === "open")
              : undefined,
      role: isSeparator ? "separator" : "none",
    },
    isSeparator ? null : (
      <>
        {createElement(
          elementType,
          {
            ...props,
            "aria-expanded": expanded,
            "aria-haspopup": hasPopup,
            "aria-label": props["aria-label"] ?? title,
            className: clsx(className, classes.button),
            popoverTarget: hasPopup ? popoverTarget ?? id : undefined,
            role,
            title,
            type:
              elementType === "button" && "type" in props
                ? props.type ?? "button"
                : undefined,
          },
          <>
            {Icon ? <Icon className={classes.icon} /> : null}
            <span aria-hidden className={classes.text}>
              {title}
            </span>
          </>
        )}
        {children}
      </>
    )
  );
};
