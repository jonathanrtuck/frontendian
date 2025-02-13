"use client";

import "./WindowHeader.theme-beos.css";
import "./WindowHeader.theme-mac-os-classic.css";
import * as applications from "@/applications";
import { WindowContext } from "@/contexts";
import { useStore } from "@/store";
import { THEME_BEOS, THEME_MAC_OS_CLASSIC } from "@/themes";
import type { MS, Pixels } from "@/types";
import type { FunctionComponent, RefObject } from "react";
import {
  useCallback,
  useContext,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import Draggable from "react-draggable";

export const WindowHeader: FunctionComponent = () => {
  const closeWindow = useStore((store) => store.closeWindow);
  const collapseWindow = useStore((store) => store.collapseWindow);
  const expandWindow = useStore((store) => store.expandWindow);
  const hideWindow = useStore((store) => store.hideWindow);
  const moveWindowTitlebar = useStore((store) => store.moveWindowTitlebar);
  const resizeWindow = useStore((store) => store.resizeWindow);
  const themeId = useStore((store) => store.themeId);
  const zoomWindow = useStore((store) => store.zoomWindow);
  const {
    applicationId,
    collapsed,
    id,
    resizable,
    scrollable,
    title,
    titlebarLeft,
    width,
    zoomed,
  } = useContext(WindowContext);
  const rootRef = useRef<HTMLElement>(null);
  const touchRef = useRef<MS>(0);
  const [x, setX] = useState<Pixels>(0);
  const application = Object.values(applications).find(
    ({ id }) => id === applicationId
  )!;
  const hasIcon = themeId === THEME_MAC_OS_CLASSIC.id;
  const isCollapsible = themeId === THEME_MAC_OS_CLASSIC.id;
  const isDoubleClickable = themeId === THEME_BEOS.id;
  const isDraggable = themeId === THEME_BEOS.id;
  const getMaxLeft = useCallback(
    () =>
      (rootRef.current
        ?.closest<HTMLElement>("[aria-current]")
        ?.getBoundingClientRect().width ?? 0) -
      (rootRef.current?.getBoundingClientRect().width ?? 0),
    []
  );
  const updatePosition = useCallback(
    () => setX(Math.max(0, titlebarLeft * getMaxLeft())),
    [getMaxLeft, titlebarLeft]
  );

  useLayoutEffect(updatePosition, [
    resizable,
    scrollable,
    themeId,
    title,
    updatePosition,
    width,
  ]);

  return (
    <Draggable
      axis="x"
      bounds="parent"
      cancel="button"
      nodeRef={rootRef as RefObject<HTMLElement>}
      onStart={(e) => {
        if (!e.shiftKey) {
          return false;
        }
      }}
      onStop={(_, { x }) => {
        const maxLeft = getMaxLeft();
        const left = Math.max(0, Math.min(maxLeft <= 0 ? 0 : x / maxLeft, 1));

        if (left !== titlebarLeft) {
          moveWindowTitlebar({ id, left });
        }
      }}
      position={
        isDraggable
          ? {
              x,
              y: 0,
            }
          : undefined
      }>
      <header
        className="component-window-header"
        onDoubleClick={
          isDoubleClickable
            ? (e) => {
                const isButton = e.target instanceof HTMLButtonElement;

                if (!isButton) {
                  hideWindow({ id });
                }
              }
            : undefined
        }
        onPointerUp={
          isDoubleClickable
            ? (e) => {
                const now = Date.now();
                const isButton = e.target instanceof HTMLButtonElement;

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
        {hasIcon && application.Icon !== undefined ? (
          <application.Icon aria-hidden /> // @todo use file icon
        ) : null}
        <h1 id={`${id}-title`} title={title}>
          {title}
        </h1>
        <button
          aria-label="Close"
          draggable={false}
          onClick={() => closeWindow({ id })}
          title="Close"
          type="button"
        />
        {Boolean(resizable) && (
          <button
            aria-label="Zoom"
            draggable={false}
            onClick={() => zoomWindow({ id })}
            title="Zoom"
            type="button"
          />
        )}
        {isCollapsible ? (
          <button
            aria-label="Collapse"
            draggable={false}
            onClick={() => {
              if (collapsed) {
                expandWindow({ id });
              } else {
                if (zoomed && rootRef.current) {
                  const contentElement = rootRef.current
                    .closest(".component-window")
                    ?.querySelector(".component-window-content");

                  if (contentElement) {
                    resizeWindow({
                      height: contentElement.scrollHeight,
                      id,
                      width: contentElement.scrollWidth,
                    });
                  }
                }

                collapseWindow({ id });
              }
            }}
            title="Collapse"
            type="button"
          />
        ) : null}
      </header>
    </Draggable>
  );
};

WindowHeader.displayName = "WindowHeader";
