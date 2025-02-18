"use client";

import { useFocus } from "@/hooks";
import type { Coordinates, ID, Size } from "@/types";
import type { FunctionComponent, PropsWithChildren, RefObject } from "react";
import { useRef } from "react";
import Draggable from "react-draggable";
import { Resizable } from "react-resizable";

const MIN_HEIGHT = 16 * 7; // 7rem
const MIN_WIDTH = 16 * 10; // 10rem

// @todo wrap with ErrorBoundary
export const Window: FunctionComponent<
  PropsWithChildren<
    {
      collapsed?: boolean;
      current?: boolean;
      hidden?: boolean;
      id: ID;
      labelledby?: string;
      onBlur?(): void;
      onDrag?(coordinates: Coordinates): void;
      onFocus?(): void;
      onResize?(size: Size): void;
      z: number;
    } & Coordinates &
      Size
  >
> = ({
  children,
  collapsed = false,
  current = false,
  height,
  id,
  labelledby,
  onBlur,
  onDrag,
  onFocus,
  onResize,
  width,
  x,
  y,
  z,
  ...props
}) => {
  const rootRef = useRef<HTMLElement>(null);
  const minWidth = 0; // @todo

  useFocus({
    deps: [current],
    ref: rootRef,
  });

  return (
    <Draggable
      cancel="[draggable='false']"
      disabled={!onDrag}
      nodeRef={rootRef as RefObject<HTMLElement>}
      onStart={(e) => {
        if (e.shiftKey) {
          return false;
        }
      }}
      onStop={(_, coordinates) => onDrag?.(coordinates)}
      position={{
        x,
        y,
      }}>
      <Resizable
        axis="both"
        handle={
          onResize && !collapsed
            ? // eslint-disable-next-line react/no-unstable-nested-components
              (_, ref) => (
                <span
                  aria-hidden
                  className="resize"
                  draggable="false"
                  ref={ref}
                />
              )
            : null
        }
        height={height}
        minConstraints={[Math.max(minWidth, MIN_WIDTH), MIN_HEIGHT]}
        onResize={onResize ? (_, { size }) => onResize(size) : undefined}
        width={width}>
        <section
          {...props}
          aria-current={current}
          aria-labelledby={labelledby}
          className="window"
          id={id}
          onBlur={({ currentTarget, relatedTarget }) => {
            if (
              document.hasFocus() &&
              !currentTarget?.contains(relatedTarget)
            ) {
              onBlur?.();
            }
          }}
          onFocus={({ currentTarget, relatedTarget }) => {
            if (!relatedTarget || !currentTarget.contains(relatedTarget)) {
              onFocus?.();
            }
          }}
          ref={rootRef}
          role="dialog"
          style={{
            height,
            width,
            zIndex: z,
          }}
          tabIndex={-1}>
          {children}
        </section>
      </Resizable>
    </Draggable>
  );
};

Window.displayName = "Window";
