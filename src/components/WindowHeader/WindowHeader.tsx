"use client";

import { WindowContext } from "@/contexts";
import { useStore } from "@/store";
import { THEME_BEOS, THEME_MAC_OS_CLASSIC } from "@/themes";
import { MS, Pixels } from "@/types";
import clsx from "clsx";
import type { FunctionComponent } from "react";
import {
  useCallback,
  useContext,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import * as styles from "./WindowHeader.css";

export const WindowHeader: FunctionComponent = () => {
  const applications = useStore((store) => store.applications);
  const closeWindow = useStore((store) => store.closeWindow);
  const collapseWindow = useStore((store) => store.collapseWindow);
  const currentThemeId = useStore((store) => store.currentThemeId);
  const expandWindow = useStore((store) => store.expandWindow);
  const hideWindow = useStore((store) => store.hideWindow);
  const themes = useStore((store) => store.themes);
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
  const theme = themes.find(({ id }) => id === currentThemeId)!;
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
    theme,
    title,
    updatePosition,
    width,
  ]);

  return (
    <header
      className={styles.root[currentThemeId]}
      onDoubleClick={
        isDoubleClickable
          ? (e) => {
              const targetElement =
                e.target instanceof HTMLElement ? e.target : null;
              const isButton = targetElement?.classList.contains(
                styles.button[currentThemeId]
              );

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
              const targetElement =
                e.target instanceof HTMLElement ? e.target : null;
              const isButton = targetElement?.classList.contains(
                styles.button[currentThemeId]
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
      {hasIcon && application.Icon !== undefined ? (
        <application.Icon aria-hidden className={styles.icon[currentThemeId]} />
      ) : null}
      <h1
        className={styles.title[currentThemeId]}
        id={`${id}-title`}
        title={title}>
        {title}
      </h1>
      <button
        aria-label="Close"
        className={clsx(
          styles.button[currentThemeId],
          styles.close[currentThemeId]
        )}
        draggable={false}
        onClick={() => closeWindow({ id })}
        title="Close"
        type="button"
      />
      {Boolean(resizable) && (
        <button
          aria-label="Zoom"
          className={clsx(
            styles.button[currentThemeId],
            styles.zoom[currentThemeId]
          )}
          draggable={false}
          onClick={() => zoomWindow({ id })}
          title="Zoom"
          type="button"
        />
      )}
      {isCollapsible ? (
        <button
          aria-label="Collapse"
          className={clsx(
            styles.button[currentThemeId],
            styles.collapse[currentThemeId]
          )}
          draggable={false}
          onClick={() =>
            collapsed ? expandWindow({ id }) : collapseWindow({ id })
          }
          title="Collapse"
          type="button"
        />
      ) : null}
    </header>
  );
};

WindowHeader.displayName = "WindowHeader";
