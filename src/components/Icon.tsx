"use client";

import clsx from "clsx";
import { type ButtonHTMLAttributes, type FunctionComponent } from "react";

export const Icon: FunctionComponent<
  ButtonHTMLAttributes<HTMLButtonElement> & {
    onClick?(): void;
    onDoubleClick?(): void;
  }
> = (props) => (
  <button
    {...props}
    className={clsx("icon", props.className)}
    onKeyDown={
      props.onKeyDown ??
      (({ key }) =>
        key === "Enter" || key === " "
          ? props.onClick?.() ?? props.onDoubleClick?.()
          : undefined)
    }
    tabIndex={0}
    type="button"
  />
);
