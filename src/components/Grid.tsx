"use client";

import { useSelection } from "@/hooks";
import type { FunctionComponent, PropsWithChildren } from "react";
import { useRef } from "react";

export const Grid: FunctionComponent<PropsWithChildren> = ({ children }) => {
  const rootRef = useRef<HTMLDivElement>(null);
  const selection = useSelection(rootRef);

  return (
    <div className="grid" ref={rootRef}>
      {children}
      {selection.from && selection.to ? (
        <mark
          aria-hidden
          role="presentation"
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

Grid.displayName = "Grid";
