import { css, CSSObject } from "@emotion/react";
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
import { byTheme } from "@/theme";
import { getTargetElement } from "@/utils";

import styles from "./Titlebar.module.css";

export type TitlebarProps = {
  maxWidth: number;
};

export const Titlebar: FunctionComponent<TitlebarProps> = ({ maxWidth }) => {
  const settings = useStore((state) => state.settings);

  const { hidden, id, scrollable, title, titlebarLeft } =
    useContext(WindowContext);

  const rootRef = useRef<HTMLElement>(null);
  const touchRef = useRef<number>(0);

  const [isDragging, setIsDragging] = useState<boolean>(false);

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
        settings.theme === "BeOS"
          ? {
              x: Math.min(titlebarLeft + offset, maxWidth - rootWidth + offset),
              y: 0,
            }
          : undefined
      }>
      <header
        css={css(
          {
            alignItems: "center",
            backgroundColor: "var(--window-background-color)",
            boxSizing: "content-box",
            display: "flex",
            height: "var(--titlebar-height)",
            padding: "var(--titlebar-padding)",
          },
          byTheme({
            BeOS: {
              borderWidth: "var(--border-width) var(--border-width) 0",
              bottom: "100%",
              left: 0,
              margin:
                "0 calc((var(--border-width) + var(--window-padding)) * -1)",
              maxWidth:
                "calc(100% - var(--window-padding) - var(--window-padding))",
              padding: "var(--window-padding)",
              position: "absolute",
              zIndex: 1,
            },
            MacOSClassic: {
              borderWidth: "0 0 var(--border-width)",
              gap: "0.25rem",
            },
          })
        )}
        onDoubleClick={
          settings.theme === "BeOS"
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
          settings.theme === "BeOS"
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
        {settings.theme === "MacOSClassic" && (
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
