"use client";

import { Selection } from "@/components";
import { useSelection } from "@/hooks";
import clsx from "clsx";
import { type FunctionComponent, type HTMLAttributes, useRef } from "react";

export const Grid: FunctionComponent<HTMLAttributes<HTMLDivElement>> = ({
  children,
  ...props
}) => {
  const rootRef = useRef<HTMLDivElement>(null);
  const selection = useSelection(rootRef);

  return (
    <div {...props} className={clsx("grid", props.className)} ref={rootRef}>
      {children}
      {selection.from && selection.to ? (
        <Selection
          style={{
            height: Math.abs(selection.from.y - selection.to.y),
            left: Math.min(selection.from.x, selection.to.x),
            top: Math.min(selection.from.y, selection.to.y),
            width: Math.abs(selection.from.x - selection.to.x),
          }}
        />
      ) : null}
    </div>
  );
};
