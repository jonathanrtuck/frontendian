"use client";

import type { MS, Percentage, Pixels } from "@/types";
import clsx from "clsx";
import type { FunctionComponent, PropsWithChildren, RefObject } from "react";
import { useMemo, useRef } from "react";
import Draggable from "react-draggable";

export const TitleBar: FunctionComponent<
  PropsWithChildren<{
    className?: string;
    left?: Percentage;
    maxWidth?: Pixels;
    onDoubleClick?(): void;
    onDrag?(left: Percentage): void;
  }>
> = ({
  children,
  className,
  left = 0,
  maxWidth = 0,
  onDoubleClick,
  onDrag,
}) => {
  const rootRef = useRef<HTMLElement>(null);
  const touchRef = useRef<MS>(0);
  const maxLeft = useMemo<Pixels>(
    () =>
      maxWidth && rootRef.current
        ? maxWidth - rootRef.current.getBoundingClientRect().width
        : 0,
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [children, maxWidth]
  );

  return (
    <Draggable
      axis="x"
      bounds="parent"
      cancel="[draggable='false']"
      disabled={!onDrag}
      nodeRef={rootRef as RefObject<HTMLElement>}
      onStart={(e) => (e.shiftKey ? undefined : false)}
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
            ? (e) =>
                !(e.target instanceof HTMLButtonElement)
                  ? onDoubleClick()
                  : undefined
            : undefined
        }
        onPointerUp={
          onDoubleClick
            ? (e) => {
                const now = Date.now();

                if (!(e.target instanceof HTMLButtonElement)) {
                  const isDoubleClick = now - touchRef.current < 500;

                  if (isDoubleClick) {
                    onDoubleClick();
                  }

                  touchRef.current = now;
                }
              }
            : undefined
        }
        ref={rootRef}>
        {children}
      </header>
    </Draggable>
  );
};

TitleBar.displayName = "TitleBar";
