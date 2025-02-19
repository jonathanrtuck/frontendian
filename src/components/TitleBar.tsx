"use client";

import type { Coordinates, MS } from "@/types";
import type { FunctionComponent, PropsWithChildren, RefObject } from "react";
import { useRef } from "react";
import Draggable from "react-draggable";

// @todo get maxLeft
export const TitleBar: FunctionComponent<
  PropsWithChildren<
    {
      onDoubleClick?(): void;
      onDrag?(coordinates: Coordinates): void;
    } & Pick<Coordinates, "x">
  >
> = ({ children, onDoubleClick, onDrag, x }) => {
  const rootRef = useRef<HTMLElement>(null);
  const touchRef = useRef<MS>(0);

  return (
    <Draggable
      axis="x"
      bounds="parent"
      cancel="[draggable='false']"
      disabled={!onDrag}
      nodeRef={rootRef as RefObject<HTMLElement>}
      onStart={(e) => {
        if (!e.shiftKey) {
          return false;
        }
      }}
      onStop={(_, { x }) => {
        onDrag?.({
          x,
          y: 0,
        });
      }}
      position={
        onDrag
          ? {
              x,
              y: 0,
            }
          : undefined
      }>
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
