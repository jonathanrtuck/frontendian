"use client";

import { TitleBarContext } from "@/components";
import { useFocus } from "@/hooks";
import type { Coordinates, ID, Pixels, Size } from "@/types";
import type { FunctionComponent, PropsWithChildren, RefObject } from "react";
import { useEffect, useRef, useState } from "react";
import Draggable from "react-draggable";
import { Resizable } from "react-resizable";

const MIN_HEIGHT: Pixels = 16 * 7; // 7rem
const MIN_WIDTH: Pixels = 16 * 10; // 10rem

export const Window: FunctionComponent<
  PropsWithChildren<
    {
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
  current = false,
  hidden,
  id,
  onBlur,
  onDrag,
  onFocus,
  onResize,
  x,
  y,
  z,
  ...props
}) => {
  const rootRef = useRef<HTMLElement>(null);
  const [height, setHeight] = useState<Pixels>(props.height);
  const [width, setWidth] = useState<Pixels>(props.width);

  useFocus({
    deps: [current],
    ref: rootRef,
  });

  useEffect(() => setHeight(props.height), [props.height]);
  useEffect(() => setWidth(props.width), [props.width]);

  return (
    <Draggable
      cancel="[draggable='false'], .react-resizable-handle"
      disabled={!onDrag}
      nodeRef={rootRef as RefObject<HTMLElement>}
      onStart={({ shiftKey }) => (shiftKey ? false : undefined)}
      onStop={(_, coordinates) =>
        coordinates.x !== x || coordinates.y !== y
          ? onDrag?.(coordinates)
          : undefined
      }
      position={{
        x,
        y,
      }}>
      <Resizable
        axis="both"
        height={height}
        minConstraints={[MIN_WIDTH, MIN_HEIGHT]}
        onResize={
          onResize
            ? (_, { size }) => {
                setHeight(size.height);
                setWidth(size.width);
              }
            : undefined
        }
        onResizeStop={
          onResize
            ? (_, { size }) =>
                (size.height !== props.height || size.width !== props.width) &&
                onResize(size)
            : undefined
        }
        width={width}>
        <section
          aria-current={current}
          aria-labelledby={`${id}-title`}
          className="window"
          hidden={hidden}
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
