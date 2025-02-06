"use client";

import { Desktop, Dialog, ErrorBoundary } from "@/components";
import { useStore } from "@/store";
import type { FunctionComponent } from "react";

export const UI: FunctionComponent = () => {
  const windows = useStore((store) => store.windows);

  return (
    <ErrorBoundary
      fallback={
        <Dialog modal open type="error">
          <p>An unknown error has occured.</p>
          <p>Please reload the page.</p>
        </Dialog>
      }>
      <Desktop />
    </ErrorBoundary>
  );
};

UI.displayName = "UI";
