"use client";

import { Applications, MainMenu, Tray } from "@/components";
import { SYSTEM_BAR_ID } from "@/ids";
import { useStore } from "@/store";
import { THEME_BEOS, THEME_MAC_OS_CLASSIC } from "@/themes";
import dynamic from "next/dynamic";
import type { FunctionComponent } from "react";
import { useRef } from "react";

// @see https://nextjs.org/docs/messages/react-hydration-error
const Clock = dynamic(() => import("./Clock").then(({ Clock }) => Clock), {
  ssr: false,
});

export const SystemBar: FunctionComponent = () => {
  const blurWindow = useStore((store) => store.blurWindow);
  const focusSystemBar = useStore((store) => store.focusSystemBar);
  const stackingOrder = useStore((store) => store.stackingOrder);
  const themeId = useStore((store) => store.themeId);
  const windows = useStore((store) => store.windows);
  const rootRef = useRef<HTMLElement>(null);
  const focusedWindowId = windows.find(({ focused }) => focused)?.id;
  const isFocused = stackingOrder.at(-1) === SYSTEM_BAR_ID;
  const isMenubarWindowed = themeId === "beos";
  const zIndex = stackingOrder.indexOf(SYSTEM_BAR_ID);

  return (
    <header
      aria-label={themeId === "beos" ? "Deskbar" : "Menubar"}
      className="component-system-bar"
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
      style={
        themeId === "beos"
          ? {
              zIndex,
            }
          : undefined
      }
      tabIndex={-1}>
      {themeId === "beos" && (
        <>
          <MainMenu />
          <Tray />
          <Applications />
        </>
      )}
      {themeId === "mac-os-classic" && (
        <>
          <MainMenu />
          <Clock />
          <Applications />
        </>
      )}
    </header>
  );
};

SystemBar.displayName = "SystemBar";
