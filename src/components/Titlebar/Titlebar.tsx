import clsx from "clsx";
import Draggable from "react-draggable";
import { FunctionComponent, useContext, useRef, useState } from "react";

import { WindowContext } from "@/contexts";
import { useComputedCustomProperty, useElementDimensions } from "@/hooks";
import {
  closeWindow,
  hideWindow,
  moveWindowTitlebar,
  showWindow,
  useStore,
  zoomWindow,
} from "@/store";
import { getTargetElement } from "@/utils";

import styles from "./Titlebar.module.css";

export type TitlebarProps = {
  maxWidth: number;
};

export const Titlebar: FunctionComponent<TitlebarProps> = ({ maxWidth }) => {
  const { hidden, id, scrollable, title, titlebarLeft } =
    useContext(WindowContext);

  const applications = useStore((state) => state.applications);
  const theme = useStore((state) => state.theme);

  const rootRef = useRef<HTMLElement>(null);
  const touchRef = useRef<number>(0);

  const [isDragging, setIsDragging] = useState<boolean>(false);

  const application = applications.find(({ windowIds }) =>
    windowIds.includes(id)
  )!;
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

        setIsDragging(true);
      }}
      onStop={(_, { x }) => {
        setIsDragging(false);

        if (x - offset !== titlebarLeft) {
          moveWindowTitlebar({ id, left: x - offset });
        }
      }}
      position={
        theme.titlebar.draggable
          ? {
              x: Math.min(titlebarLeft + offset, maxWidth - rootWidth + offset),
              y: 0,
            }
          : undefined
      }>
      <header
        className={clsx(styles.root, {
          [styles.dragging]: isDragging,
        })}
        onDoubleClick={
          theme.titlebar.doubleClick
            ? (e) => {
                const targetElement = getTargetElement(e);
                const isButton = targetElement?.classList.contains(
                  styles.button
                );

                if (!isButton) {
                  hideWindow({ id });
                }
              }
            : undefined
        }
        onPointerUp={
          theme.titlebar.doubleClick
            ? (e) => {
                const now = Date.now();
                const targetElement = getTargetElement(e);
                const isButton = targetElement?.classList.contains(
                  styles.button
                );

                if (!isButton) {
                  const isDoubleClick = now - touchRef.current < 500;

                  if (isDoubleClick) {
                    hideWindow({ id });
                  }

                  touchRef.current = now;
                }
              }
            : undefined
        }
        ref={rootRef}>
        {Boolean(theme.titlebar.icon) && application.Icon !== undefined && (
          <application.Icon aria-hidden className={styles.icon} />
        )}
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
        {Boolean(scrollable) && (
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
        )}
        {Boolean(theme.titlebar.collapsible) && (
          <button
            aria-label="Collapse"
            className={clsx(styles.button, styles.collapse)}
            draggable={false}
            onClick={() => {
              hidden ? showWindow({ id }) : hideWindow({ id });
            }}
            title="Collapse"
            type="button"
          />
        )}
      </header>
    </Draggable>
  );
};

Titlebar.displayName = "Titlebar";
