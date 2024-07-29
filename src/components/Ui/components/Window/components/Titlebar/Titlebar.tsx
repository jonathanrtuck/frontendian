import clsx from "clsx";
import Draggable from "react-draggable";
import { FunctionComponent, useContext, useRef } from "react";

import { WindowContext } from "@/contexts";
import { useComputedCustomProperty, useElementDimensions } from "@/hooks";
import {
  closeWindow,
  hideWindow,
  moveWindowTitlebar,
  zoomWindow,
} from "@/store";

import styles from "./Titlebar.module.css";

export type TitlebarProps = {
  maxWidth: number;
};

export const Titlebar: FunctionComponent<TitlebarProps> = ({ maxWidth }) => {
  const { id, title, titlebarLeft } = useContext(WindowContext);

  const rootRef = useRef<HTMLElement>(null);
  const touchRef = useRef<number>(0);

  const offset = useComputedCustomProperty("--window-padding");
  const { width: rootWidth } = useElementDimensions(rootRef, [maxWidth, title]);

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
        moveWindowTitlebar({ id, left: x - offset });
      }}
      position={{
        x: Math.min(titlebarLeft + offset, maxWidth - rootWidth + offset),
        y: 0,
      }}>
      <header
        className={styles.root}
        onDoubleClick={(e) => {
          const isButton = (e.target as HTMLElement)?.classList.contains(
            styles.button
          );

          if (!isButton) {
            hideWindow({ id });
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
              hideWindow({ id });
            }

            touchRef.current = now;
          }
        }}
        ref={rootRef}>
        <h1 className={styles.title} id={`${id}-title`} title={title}>
          {title}
        </h1>
        <button
          aria-label="Close"
          className={clsx(styles.button, styles.close)}
          draggable={false}
          onClick={() => {
            closeWindow({ id });
          }}
          title="Close"
          type="button"
        />
        <button
          aria-label="Zoom"
          className={clsx(styles.button, styles.zoom)}
          draggable={false}
          onClick={() => {
            zoomWindow({ id });
          }}
          title="Zoom"
          type="button"
        />
      </header>
    </Draggable>
  );
};
