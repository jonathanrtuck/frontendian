import { FunctionComponent, useRef } from "react";

import { Applications, MainMenu, Tray } from "@/components";
import { SYSTEM_BAR_ID } from "@/constants";
import { useStore, useStyles } from "@/hooks";
import { blurWindow, focusSystemBar } from "@/store";

export const SystemBar: FunctionComponent = () => {
  const stackingOrder = useStore((state) => state.stackingOrder);
  const theme = useStore((state) => state.theme);
  const windows = useStore((state) => state.windows);
  const styles = useStyles("SystemBar");

  const rootRef = useRef<HTMLElement>(null);

  const focusedWindowId = windows.find(({ focused }) => focused)?.id;
  const isFocused = stackingOrder.at(-1) === SYSTEM_BAR_ID;
  const isMenubarWindowed = theme.id === "theme-beos";
  const zIndex = stackingOrder.indexOf(SYSTEM_BAR_ID);

  return (
    <header
      aria-label={theme.id === "theme-beos" ? "Deskbar" : "Menubar"}
      className={styles.root}
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

SystemBar.displayName = "SystemBar";
