"use client";

import type { Percentage, Pixels } from "@/types";
import clsx from "clsx";
import type { FunctionComponent, PropsWithChildren, RefObject } from "react";
import { createContext, useContext, useMemo, useRef } from "react";
import Draggable from "react-draggable";

export const TitleBarContext = createContext<
  Partial<{
    id: string;
    width: Pixels;
  }>
>({});

export const TitleBar: FunctionComponent<
  PropsWithChildren<{
    className?: string;
    left?: Percentage;
    onDoubleClick?(): void;
    onDrag?(left: Percentage): void;
  }>
> = ({ children, className, left = 0, onDoubleClick, onDrag }) => {
  const { width } = useContext(TitleBarContext);
  const rootRef = useRef<HTMLElement>(null);
  const maxLeft = useMemo<Pixels>(
    () =>
      width && rootRef.current
        ? width - rootRef.current.getBoundingClientRect().width
        : 0,
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
        className={clsx("title-bar", className)}
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
