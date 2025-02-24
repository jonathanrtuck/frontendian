"use client";

import { WindowContext } from "@/contexts";
import type { Percentage, Pixels } from "@/types";
import type { FunctionComponent, PropsWithChildren, RefObject } from "react";
import { useContext, useLayoutEffect, useRef, useState } from "react";
import Draggable from "react-draggable";

export const TitleBar: FunctionComponent<
  PropsWithChildren<{
    left?: Percentage;
    onDoubleClick?(): void;
    onDrag?(left: Percentage): void;
  }>
> = ({ children, left = 0, onDoubleClick, onDrag }) => {
  const { width = "auto" } = useContext(WindowContext);
  const rootRef = useRef<HTMLElement>(null);
  const [maxLeft, setMaxLeft] = useState<Pixels>(0);

  useLayoutEffect(
    () =>
      width !== "auto" && rootRef.current
        ? setMaxLeft(width - rootRef.current.getBoundingClientRect().width)
        : undefined,
    [children, width]
  );

  return (
    <Draggable
      axis="x"
      bounds="parent"
      cancel="[draggable='false']"
      disabled={!onDrag}
      nodeRef={rootRef as RefObject<HTMLElement>}
      onStart={({ shiftKey }) => (shiftKey ? undefined : false)}
      onStop={(_, { x }) =>
        onDrag?.(Math.max(0, Math.min(maxLeft <= 0 ? 0 : x / maxLeft, 1)))
      }
      position={{
        x: left * maxLeft,
        y: 0,
      }}>
      <header
        className="title-bar"
        onDoubleClick={
          onDoubleClick
            ? ({ target }) =>
                !(target instanceof HTMLButtonElement)
                  ? onDoubleClick()
                  : undefined
            : undefined
        }
        ref={rootRef}>
        {children}
      </header>
    </Draggable>
  );
};

TitleBar.displayName = "TitleBar";
