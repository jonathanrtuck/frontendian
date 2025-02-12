"use client";

import "./WindowHeader.theme-beos.css";
import "./WindowHeader.theme-mac-os-classic.css";
import { WindowContext } from "@/contexts";
import { useStore } from "@/store";
import { THEME_BEOS, THEME_MAC_OS_CLASSIC } from "@/themes";
import { MS, Pixels } from "@/types";
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
  const applications = useStore((store) => store.applications);
  const closeWindow = useStore((store) => store.closeWindow);
  const collapseWindow = useStore((store) => store.collapseWindow);
  const currentThemeId = useStore((store) => store.currentThemeId);
  const expandWindow = useStore((store) => store.expandWindow);
  const hideWindow = useStore((store) => store.hideWindow);
  const moveWindowTitlebar = useStore((store) => store.moveWindowTitlebar);
  const zoomWindow = useStore((store) => store.zoomWindow);
  const { collapsed, id, resizable, scrollable, title, titlebarLeft, width } =
    useContext(WindowContext);
  const rootRef = useRef<HTMLElement>(null);
  const touchRef = useRef<MS>(0);
  const [x, setX] = useState<Pixels>(0);
  const application = applications.find(({ windowIds }) =>
    windowIds.includes(id)
  )!;
  const hasIcon = currentThemeId === THEME_MAC_OS_CLASSIC.id;
  const isCollapsible = currentThemeId === THEME_MAC_OS_CLASSIC.id;
  const isDoubleClickable = currentThemeId === THEME_BEOS.id;
  const isDraggable = currentThemeId === THEME_BEOS.id;
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
    currentThemeId,
    resizable,
    scrollable,
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
          <application.Icon aria-hidden themeId={currentThemeId} /> // @todo use file icon
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
            onClick={() =>
              collapsed ? expandWindow({ id }) : collapseWindow({ id })
            }
            title="Collapse"
            type="button"
          />
        ) : null}
      </header>
    </Draggable>
  );
};

WindowHeader.displayName = "WindowHeader";
