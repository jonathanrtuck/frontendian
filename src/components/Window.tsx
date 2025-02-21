"use client";

import { TitleBarContext } from "@/components";
import { useFocus } from "@/hooks";
import type { Coordinates, ID, Size } from "@/types";
import type { FunctionComponent, PropsWithChildren, RefObject } from "react";
import { useRef } from "react";
import Draggable from "react-draggable";
import { Resizable } from "react-resizable";

const MIN_HEIGHT = 16 * 7; // 7rem
const MIN_WIDTH = 16 * 10; // 10rem

export const Window: FunctionComponent<
  PropsWithChildren<
    {
      collapsed?: boolean;
      current?: boolean;
      hidden?: boolean;
      id: ID;
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

  useFocus({
    deps: [current],
    ref: rootRef,
  });

  return (
    <Draggable
      cancel="[draggable='false']"
      disabled={!onDrag}
      nodeRef={rootRef as RefObject<HTMLElement>}
      onStart={({ shiftKey }) => (shiftKey ? false : undefined)}
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
                <span aria-hidden draggable="false" ref={ref} role="img" />
              )
            : null
        }
        height={height}
        minConstraints={[MIN_WIDTH, MIN_HEIGHT]}
        onResize={onResize ? (_, { size }) => onResize(size) : undefined}
        width={width}>
        <section
          {...props}
          aria-current={current}
          aria-labelledby={`${id}-title`}
          className="window"
          id={id}
          onBlur={
            onBlur
              ? ({ currentTarget, relatedTarget }) =>
                  document.hasFocus() && !currentTarget?.contains(relatedTarget)
                    ? onBlur()
                    : undefined
              : undefined
          }
          onFocus={
            onFocus
              ? ({ currentTarget, relatedTarget }) =>
                  !relatedTarget || !currentTarget.contains(relatedTarget)
                    ? onFocus()
                    : undefined
              : undefined
          }
          ref={rootRef}
          role="dialog"
          style={{
            height,
            width,
            zIndex: z,
          }}
          tabIndex={-1}>
          <TitleBarContext.Provider
            value={{
              id: `${id}-title`,
              width,
            }}>
            {children}
          </TitleBarContext.Provider>
        </section>
      </Resizable>
    </Draggable>
  );
};

Window.displayName = "Window";
