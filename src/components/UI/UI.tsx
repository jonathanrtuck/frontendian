"use client";

import {
  Desktop,
  Dialog,
  ErrorBoundary,
  SystemBar,
  Window,
} from "@/components";
import { FILE_README_MD } from "@/files";
import { useStore } from "@/store";
import * as themes from "@/themes";
import type { FunctionComponent } from "react";
import { useEffect, useLayoutEffect } from "react";
import "./UI.css";

export const UI: FunctionComponent = () => {
  const currentThemeId = useStore((store) => store.currentThemeId);
  const openFile = useStore((store) => store.openFile);
  const windows = useStore((store) => store.windows);

  useLayoutEffect(
    () =>
      Object.values(themes).forEach(({ id }) => {
        document.documentElement.classList.toggle(id, id === currentThemeId);
      }),
    [currentThemeId]
  );
  useEffect(() => openFile({ id: FILE_README_MD.id }), [openFile]);

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
      {windows.map((window) => (
        <Window {...window} key={window.id} />
      ))}
    </ErrorBoundary>
  );
};

UI.displayName = "UI";
