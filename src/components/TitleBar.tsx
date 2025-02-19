"use client";

import type { MS, Pixels } from "@/types";
import type { FunctionComponent, PropsWithChildren, RefObject } from "react";
import { useMemo, useRef } from "react";
import Draggable from "react-draggable";

// @todo get maxLeft
export const TitleBar: FunctionComponent<
  PropsWithChildren<{
    left?: number;
    maxWidth?: Pixels;
    onDoubleClick?(): void;
    onDrag?(left: number): void;
  }>
> = ({ children, left = 0, maxWidth = 0, onDoubleClick, onDrag }) => {
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
        className="title-bar"
        onDoubleClick={
          onDoubleClick
            ? (e) => {
                const isButton = e.target instanceof HTMLButtonElement;

                if (!isButton) {
                  onDoubleClick();
                }
              }
            : undefined
        }
        onPointerUp={
          onDoubleClick
            ? (e) => {
                const now = Date.now();
                const isButton = e.target instanceof HTMLButtonElement;

                if (!isButton) {
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
