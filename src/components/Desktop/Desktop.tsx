"use client";

import { useStore } from "@/store";
import { THEME_BEOS, THEME_MAC_OS_CLASSIC } from "@/themes";
import type { FunctionComponent } from "react";
import { root } from "./Desktop.css";

export const Desktop: FunctionComponent = () => {
  const currentThemeId = useStore((store) => store.currentThemeId);
  const setTheme = useStore((store) => store.setTheme);

  return (
    <div
      aria-label="Desktop"
      className={root({
        theme: currentThemeId,
      })}>
      desktop…
      <button
        onClick={() => {
          setTheme({
            id:
              currentThemeId === THEME_BEOS.id
                ? THEME_MAC_OS_CLASSIC.id
                : THEME_BEOS.id,
          });
        }}
        type="button">
        toggle theme
      </button>
    </div>
  );
};

Desktop.displayName = "Desktop";
