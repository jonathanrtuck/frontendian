"use client";

import { type IconComponent } from "@/types";
import clsx from "clsx";
import { type ButtonHTMLAttributes, type FunctionComponent } from "react";

export const Icon: FunctionComponent<
  ButtonHTMLAttributes<HTMLButtonElement> & {
    classes?: Partial<{
      icon: string;
      root: string;
      text: string;
    }>;
    Icon: IconComponent;
    title: string;
  } & (
      | { onClick(): void; onDoubleClick?(): void }
      | { onClick?(): void; onDoubleClick(): void }
    )
> = ({
  classes = {},
  className,
  Icon,
  title,
  tabIndex = 0,
  type = "button",
  ...props
}) => (
  <button
    {...props}
    className={clsx("icon", className, classes.root)}
    onKeyDown={(e) => {
      switch (e.key) {
        case "Enter":
        case " ":
          props.onClick?.();
          props.onDoubleClick?.();
          break;
      }
      props.onKeyDown?.(e);
    }}
    tabIndex={tabIndex}
    // eslint-disable-next-line react/button-has-type
    type={type}>
    <Icon className={classes.icon} />
    <span className={classes.text}>{title}</span>
  </button>
);
