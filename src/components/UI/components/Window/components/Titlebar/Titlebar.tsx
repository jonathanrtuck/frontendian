import clsx from "clsx";
import Draggable from "react-draggable";
import { FunctionComponent, useContext, useRef, useState } from "react";

import { CLASSNAME_PREFIX } from "@/constants";
import { WindowContext } from "@/contexts";
import {
  useComputedCustomProperty,
  useCssByTheme,
  useElementDimensions,
} from "@/hooks";
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
  const theme = useStore((state) => state.theme);

  const { focused, hidden, id, scrollable, title, titlebarLeft } =
    useContext(WindowContext);

  const rootRef = useRef<HTMLElement>(null);
  const touchRef = useRef<number>(0);

  const [isDragging, setIsDragging] = useState<boolean>(false);

  const offset = useComputedCustomProperty("--window-padding");
  const themeCss = useCssByTheme(theme);
  const { width: rootWidth } = useElementDimensions(rootRef, [maxWidth, title]);

  const buttonCss = themeCss(
    {
      ":focus": {
        outline: 0,
      },
      backgroundImage: "var(--titlebar_button-background)",
      borderWidth: theme.borderWidth,
      cursor: "var(--cursor--default)",
      flex: `0 0 ${theme.titlebar.height}`,
      height: theme.titlebar.height,
      position: "relative",
      width: theme.titlebar.height,
    },
    {
      "::before": {
        borderColor:
          "rgb(255, 255, 255) rgb(128, 128, 128) rgb(128, 128, 128) rgb(255, 255, 255)",
        borderWidth: theme.borderWidth,
        bottom: theme.borderWidth,
        content: "''",
        left: theme.borderWidth,
        outlineColor: "rgb(38, 38, 38)",
        outlineStyle: "solid",
        outlineWidth: theme.borderWidth,
        position: "absolute",
        right: theme.borderWidth,
        top: theme.borderWidth,
      },
      ":focus": {
        outline: 0,
      },
      backgroundImage: "var(--titlebar_button-background)",
      borderColor:
        "rgb(128, 128, 128) rgb(255, 255, 255) rgb(255, 255, 255) rgb(128, 128, 128)",
      borderWidth: theme.borderWidth,
      cursor: "var(--cursor--default)",
      flex: `0 0 ${theme.titlebar.height}`,
      height: theme.titlebar.height,
      position: "relative",
      width: theme.titlebar.height,
    }
  );

  return (
    <Draggable
      axis="x"
      bounds="parent"
      cancel={`.${CLASSNAME_PREFIX}${buttonCss.name}`}
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
        css={themeCss(
          {
            alignItems: "center",
            backgroundColor: theme.window.backgroundColor,
            backgroundImage: focused
              ? "linear-gradient(to bottom, rgb(255, 237, 172), rgb(255, 200, 0))"
              : undefined,
            borderWidth: `${theme.borderWidth} ${theme.borderWidth} 0`,
            bottom: "100%",
            boxSizing: "content-box",
            cursor: isDragging ? "var(--cursor--grabbing)" : undefined,
            display: "flex",
            height: theme.titlebar.height,
            left: 0,
            margin: `0 calc((${theme.borderWidth} + ${theme.window.padding}) * -1)`,
            maxWidth: `calc(100% - ${theme.window.padding} - ${theme.window.padding})`,
            padding: theme.window.padding,
            position: "absolute",
            zIndex: 1,
          },
          {
            "::before": {
              borderColor:
                "rgb(235, 235, 235) rgb(138, 138, 138) rgb(138, 138, 138) rgb(235, 235, 235)",
              borderWidth: theme.borderWidth,
              bottom: 0,
              content: "''",
              gap: "0.25rem",
              left: 0,
              position: "absolute",
              right: 0,
              top: 0,
            },
            alignItems: "center",
            backgroundColor: theme.window.backgroundColor,
            borderWidth: `0 0 ${theme.borderWidth}`,
            boxSizing: "content-box",
            display: "flex",
            gap: "0.25rem",
            height: theme.titlebar.height,
            padding: theme.titlebar.padding,
          }
        )}
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
        <h1
          css={themeCss(
            {
              flex: "1 1 auto",
              fontSize: "1rem",
              margin: "0 1rem",
              order: 2,
              overflow: "hidden",
              textOverflow: "ellipsis",
              userSelect: "none",
              whiteSpace: "nowrap",
            },
            {
              "::before, ::after": {
                background:
                  "repeating-linear-gradient( rgb(221, 221, 221), rgb(221, 221, 221) var(--border-width), rgb(153, 153, 153) var(--border-width), rgb(153, 153, 153) calc(var(--border-width) * 2))",
                borderColor:
                  "transparent rgba(0, 0, 0, 0.1) transparent rgba(255, 255, 255, 0.3)",
                borderSidth: `0 ${theme.borderWidth}`,
                content: "''",
                flex: "1 1 auto",
                margin: "0.125rem 0",
              },
              display: "flex",
              flex: "1 1 auto",
              fontFamily: "var(--font-family--charcoal)",
              fontSize: "0.875rem",
              gap: "0.5rem",
              margin: 0,
              order: 2,
              overflow: "hidden",
              textOverflow: "ellipsis",
              userSelect: "none",
              whiteSpace: "nowrap",
            }
          )}
          id={`${id}-title`}
          title={title}>
          {title}
        </h1>
        <button
          aria-label="Close"
          className={clsx(styles.button, styles.close)}
          css={buttonCss}
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
            css={buttonCss}
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
            css={buttonCss}
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
