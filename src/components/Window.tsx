"use client";

import { WindowContext } from "@/contexts";
import { useFocus } from "@/hooks";
import { SYSTEM_BAR_ID } from "@/ids";
import { type Coordinates, type ID, type Pixels, type Size } from "@/types";
import clsx from "clsx";
import {
  type FunctionComponent,
  type PropsWithChildren,
  type RefObject,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import Draggable from "react-draggable";
import { Resizable } from "react-resizable";

const MIN_HEIGHT: Pixels = 16 * 7; // 7rem
const MIN_WIDTH: Pixels = 16 * 10; // 10rem

export const Window: FunctionComponent<
  PropsWithChildren<
    {
      applicationId?: ID;
      current?: boolean;
      hasMenubar?: boolean;
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
  applicationId,
  children,
  current = false,
  hasMenubar,
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
  const [height, setHeight] = useState<Size["height"]>(props.height);
  const [width, setWidth] = useState<Size["width"]>(props.width);

  useFocus({
    deps: [current],
    ref: rootRef,
  });

  useLayoutEffect(() => {
    const root = rootRef.current;

    if (root && props.height === "auto") {
      const resizeObserver = new ResizeObserver(() => {
        setHeight(root.getBoundingClientRect().height ?? 0);
      });

      resizeObserver.observe(root);

      return () => resizeObserver.unobserve(root);
    } else {
      setHeight(props.height);
    }
  }, [props.height]);
  useLayoutEffect(() => {
    const root = rootRef.current;

    if (root && props.width === "auto") {
      const resizeObserver = new ResizeObserver(() => {
        setWidth(root.getBoundingClientRect().width ?? 0);
      });

      resizeObserver.observe(root);

      return () => resizeObserver.unobserve(root);
    } else {
      setWidth(props.width);
    }
  }, [props.width]);

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
        handle={onResize ? undefined : <span hidden />}
        height={height === "auto" ? 0 : height}
        minConstraints={[MIN_WIDTH, MIN_HEIGHT]}
        onResize={
          onResize
            ? (_, { size }) => {
                setHeight(size.height);
                setWidth(size.width);
              }
            : undefined
        }
        onResizeStart={
          onResize
            ? () =>
                (props.height === "auto" || props.width === "auto") &&
                onResize?.({
                  height,
                  width,
                })
            : undefined
        }
        onResizeStop={
          onResize
            ? (_, { size }) =>
                (size.height !== props.height || size.width !== props.width) &&
                onResize(size)
            : undefined
        }
        width={width === "auto" ? 0 : width}>
        <section
          aria-current={current}
          aria-labelledby={`${id}-title`}
          className={clsx("window", { isCollapsed: props.height === 0 })}
          hidden={hidden}
          id={id}
          onBlur={
            onBlur
              ? ({ currentTarget, relatedTarget }) =>
                  current &&
                  document.hasFocus() &&
                  !currentTarget?.contains(relatedTarget) &&
                  (hasMenubar ||
                    !document
                      .getElementById(SYSTEM_BAR_ID)
                      ?.contains(relatedTarget)) &&
                  onBlur()
              : undefined
          }
          onFocus={
            onFocus
              ? ({ currentTarget, relatedTarget }) =>
                  !current &&
                  (!relatedTarget || !currentTarget.contains(relatedTarget)) &&
                  onFocus()
              : undefined
          }
          ref={rootRef}
          role="dialog"
          style={{
            height:
              props.height === 0 || props.height === "auto" || height === 0
                ? "auto"
                : height,
            width: props.width === "auto" ? "auto" : width,
            zIndex: z,
          }}
          tabIndex={-1}>
          <WindowContext.Provider
            value={{
              applicationId,
              current,
              id,
              width,
            }}>
            {children}
          </WindowContext.Provider>
        </section>
      </Resizable>
    </Draggable>
  );
};
