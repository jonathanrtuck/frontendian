import clsx from "clsx";
import Draggable from "react-draggable";
import { FunctionComponent, useRef } from "react";

import { useComputedCustomProperty, useElementDimensions } from "@/hooks";
import { ID } from "@/types";

import styles from "./TitleBar.module.css";

export type TitleBarProps = {
  classes?: {
    button?: string;
    root?: string;
    title?: string;
  };
  id: ID;
  left: number;
  maxWidth: number;
  onClose(): void;
  onHide(): void;
  onMove(left: number): void;
  onZoom?(): void;
  title: string;
};

export const TitleBar: FunctionComponent<TitleBarProps> = ({
  classes,
  id,
  left,
  maxWidth,
  onClose,
  onHide,
  onMove,
  onZoom,
  title,
}) => {
  const rootRef = useRef<HTMLElement>(null);
  const touchRef = useRef<number>(0);

  const offset = useComputedCustomProperty("--window-padding");
  const { width: rootWidth } = useElementDimensions(rootRef, [
    maxWidth,
    onZoom,
    title,
  ]);

  return (
    <Draggable
      axis="x"
      bounds="parent"
      cancel={`.${styles.button}`}
      nodeRef={rootRef}
      onStart={(e) => {
        if (!e.shiftKey) {
          return false;
        }
      }}
      onStop={(_, { x }) => {
        onMove(x - offset);
      }}
      position={{
        x: Math.min(left + offset, maxWidth - rootWidth + offset),
        y: 0,
      }}>
      <header
        className={clsx(classes?.root, styles.root)}
        onDoubleClick={(e) => {
          const isButton = (e.target as HTMLElement)?.classList.contains(
            styles.button
          );

          if (!isButton) {
            onHide();
          }
        }}
        onPointerUp={(e) => {
          const now = Date.now();
          const isButton = (e.target as HTMLElement)?.classList.contains(
            styles.button
          );

          if (!isButton) {
            const isDoubleClick = now - touchRef.current < 500;

            if (isDoubleClick) {
              onHide();
            }

            touchRef.current = now;
          }
        }}
        ref={rootRef}>
        <h1
          className={clsx(classes?.title, styles.title)}
          id={`${id}-title`}
          title={title}>
          {title}
        </h1>
        <button
          aria-label="Close"
          className={clsx(classes?.button, styles.button, styles.close)}
          onClick={onClose}
          title="Close"
          type="button"
        />
        {onZoom && (
          <button
            aria-label="Zoom"
            className={clsx(classes?.button, styles.button, styles.zoom)}
            onClick={onZoom}
            title="Zoom"
            type="button"
          />
        )}
      </header>
    </Draggable>
  );
};
