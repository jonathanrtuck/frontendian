"use client";

import type { IconComponent, MS } from "@/types";
import clsx from "clsx";
import type { FunctionComponent, HTMLAttributes } from "react";
import { useLayoutEffect, useRef } from "react";
import Draggable from "react-draggable";

export const TitleBar: FunctionComponent<
  Omit<
    HTMLAttributes<HTMLElement>,
    | "children"
    | "onDoubleClick"
    | "onDoubleClickCapture"
    | "onDrag"
    | "onDragCapture"
    | "onDragEnd"
    | "onDragEndCapture"
    | "onDragEnter"
    | "onDragEnterCapture"
    | "onDragExit"
    | "onDragExitCapture"
    | "onDragLeave"
    | "onDragLeaveCapture"
    | "onDragOver"
    | "onDragOverCapture"
    | "onDragStart"
    | "onDragStartCapture"
    | "title"
  > & {
    Icon?: IconComponent;
    onClose?(): void;
    onCollapse?(): void;
    onDoubleClick?(): void;
    onDrag?(): void;
    onExpand?(): void;
    onZoom?(): void;
    title: string;
  }
> = ({
  className,
  Icon,
  onClose,
  onCollapse,
  onDoubleClick,
  onDrag,
  onExpand,
  onZoom,
  title,
}) => {
  const rootRef = useRef<HTMLElement>(null);
  const touchRef = useRef<MS>(0);

  useLayoutEffect(() => {
    const id = rootRef.current?.parentElement?.getAttribute("aria-labelledby");

    if (id) {
      rootRef.current?.querySelector("h1")?.setAttribute("id", id);
    }
  }, []);

  return (
    <header
      className={clsx("component-title-bar", className)}
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
      {Icon ? <Icon aria-hidden /> : null}
      <h1 title={title}>{title}</h1>
      {onClose ? (
        <button
          aria-label="Close"
          draggable={false}
          onClick={onClose}
          title="Close"
          type="button"
        />
      ) : null}
      {onZoom ? (
        <button
          aria-label="Zoom"
          draggable={false}
          onClick={onZoom}
          title="Zoom"
          type="button"
        />
      ) : null}
      {onCollapse || onExpand ? (
        <button
          aria-label={onCollapse ? "Expand" : "Collapse"}
          draggable={false}
          onClick={onCollapse ?? onExpand}
          title={onCollapse ? "Expand" : "Collapse"}
          type="button"
        />
      ) : null}
    </header>
  );
};

TitleBar.displayName = "TitleBar";
