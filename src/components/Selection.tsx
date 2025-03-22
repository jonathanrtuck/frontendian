"use client";

import { useSelection } from "@/hooks";
import clsx from "clsx";
import {
  type FunctionComponent,
  type HTMLAttributes,
  type RefObject,
} from "react";

export const Selection: FunctionComponent<
  HTMLAttributes<HTMLElement> & { ref: RefObject<HTMLDivElement | null> }
> = ({ className, ref, style, ...props }) => {
  const selection = useSelection(ref);

  return selection.from && selection.to ? (
    <mark
      {...props}
      aria-hidden
      className={clsx("selection", className)}
      style={{
        ...style,
        height: Math.abs(selection.from.y - selection.to.y),
        left: Math.min(selection.from.x, selection.to.x),
        top: Math.min(selection.from.y, selection.to.y),
        width: Math.abs(selection.from.x - selection.to.x),
      }}
    />
  ) : null;
};
