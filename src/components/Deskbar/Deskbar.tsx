import { FunctionComponent, useRef } from "react";

import { Applications, MainMenu, Menu, Tray } from "@/components";
import { DESKBAR_ID } from "@/constants";
import { useStyles } from "@/hooks";
import { blurWindow, focusDeskbar, useStore } from "@/store";

import stylesBeos from "./Deskbar.beos.module.css";
import stylesMacOsClassic from "./Deskbar.mac-os-classic.module.css";

export const Deskbar: FunctionComponent = () => {
  const stackingOrder = useStore((state) => state.stackingOrder);
  const theme = useStore((state) => state.theme);
  const windows = useStore((state) => state.windows);

  const rootRef = useRef<HTMLElement>(null);

  const styles = useStyles({
    "theme-beos": stylesBeos,
    "theme-mac-os-classic": stylesMacOsClassic,
  });

  const focusedWindowId = windows.find(({ focused }) => focused)?.id;
  const isFocused = stackingOrder.at(-1) === DESKBAR_ID;
  const isMenubarWindowed = theme.id === "theme-beos";
  const zIndex = stackingOrder.indexOf(DESKBAR_ID);

  return (
    <header
      aria-label={theme.id === "theme-beos" ? "Deskbar" : "Menubar"}
      className={styles.root}
      id={DESKBAR_ID}
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
                focusDeskbar();
              }
            }
          : undefined
      }
      ref={rootRef}
      style={{
        zIndex,
      }}
      tabIndex={-1}>
      {theme.id === "theme-beos" && (
        <>
          <MainMenu />
          <Tray />
          <Applications />
        </>
      )}
      {theme.id === "theme-mac-os-classic" && (
        <>
          {!focusedWindowId && <MainMenu />}
          <Tray />
        </>
      )}
    </header>
  );
};

Deskbar.displayName = "Deskbar";
