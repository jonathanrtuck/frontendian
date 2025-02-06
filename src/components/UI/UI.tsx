"use client";

import { Desktop, Dialog, ErrorBoundary, SystemBar } from "@/components";
import { useStore } from "@/store";
import * as themes from "@/themes";
import type { FunctionComponent } from "react";
import { useLayoutEffect } from "react";
import "./UI.css";

export const UI: FunctionComponent = () => {
  const currentThemeId = useStore((store) => store.currentThemeId);
  const windows = useStore((store) => store.windows);

  useLayoutEffect(() => {
    Object.values(themes).forEach(({ id }) => {
      document.documentElement.classList.toggle(id, id === currentThemeId);
    });
  }, [currentThemeId]);

  return (
    <ErrorBoundary
      fallback={
        <Dialog modal open type="error">
          <p>An unknown error has occured.</p>
          <p>Please reload the page.</p>
        </Dialog>
      }>
      <Desktop />
      <SystemBar />
    </ErrorBoundary>
  );
};

UI.displayName = "UI";
