"use client";

import { Applications, MainMenu, Tray } from "@/components";
import { SYSTEM_BAR_ID } from "@/constants";
import { useStore } from "@/store";
import { THEME_BEOS, THEME_MAC_OS_CLASSIC } from "@/themes";
import type { FunctionComponent } from "react";
import { useRef } from "react";
import * as styles from "./SystemBar.css";

export const SystemBar: FunctionComponent = () => {
  const blurWindow = useStore((store) => store.blurWindow);
  const currentThemeId = useStore((store) => store.currentThemeId);
  const focusSystemBar = useStore((store) => store.focusSystemBar);
  const stackingOrder = useStore((store) => store.stackingOrder);
  const windows = useStore((store) => store.windows);
  const rootRef = useRef<HTMLElement>(null);
  const focusedWindowId = windows.find(({ focused }) => focused)?.id;
  const isFocused = stackingOrder.at(-1) === SYSTEM_BAR_ID;
  const isMenubarWindowed = currentThemeId === THEME_BEOS.id;
  const zIndex = stackingOrder.indexOf(SYSTEM_BAR_ID);

  return (
    <header
      aria-label={currentThemeId === THEME_BEOS.id ? "Deskbar" : "Menubar"}
      className={styles.root[currentThemeId]}
      id={SYSTEM_BAR_ID}
      onBlur={
        isMenubarWindowed
          ? undefined
          : (e) => {
              if (
                document.hasFocus() &&
                focusedWindowId &&
                !e.currentTarget?.contains(e.relatedTarget) &&
                !document
                  .getElementById(focusedWindowId)
                  ?.contains(e.relatedTarget)
              ) {
                blurWindow({ id: focusedWindowId });
              }
            }
      }
      onFocus={
        isMenubarWindowed
          ? ({ relatedTarget }) => {
              if (
                !isFocused &&
                (!relatedTarget || !rootRef.current?.contains(relatedTarget))
              ) {
                focusSystemBar();
              }
            }
          : undefined
      }
      ref={rootRef}
      role="banner"
      style={{
        zIndex,
      }}
      tabIndex={-1}>
      {currentThemeId === THEME_BEOS.id && (
        <>
          <MainMenu />
          <Tray />
          <Applications />
        </>
      )}
      {currentThemeId === THEME_MAC_OS_CLASSIC.id && <></>}
    </header>
  );
};

SystemBar.displayName = "SystemBar";
