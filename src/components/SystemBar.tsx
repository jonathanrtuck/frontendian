"use client";

import { SYSTEM_BAR_ID } from "@/ids";
import type { Window } from "@/types";
import type { FunctionComponent, PropsWithChildren } from "react";

export const SystemBar: FunctionComponent<
  PropsWithChildren<{
    onBlur?(focusedWindowId?: Window["id"]): void;
    onFocus?(): void;
    title: string;
    z?: number;
  }>
> = ({ children, onBlur, onFocus, title, z }) => (
  <header
    aria-label={title}
    className="system-bar"
    id={SYSTEM_BAR_ID}
    onBlur={
      onBlur
        ? ({ currentTarget, relatedTarget }) =>
            !relatedTarget || !currentTarget.contains(relatedTarget)
              ? onBlur(relatedTarget?.closest(".window")?.id)
              : undefined
        : undefined
    }
    onFocus={
      onFocus
        ? ({ currentTarget, relatedTarget }) =>
            !relatedTarget || !currentTarget.contains(relatedTarget)
              ? onFocus()
              : undefined
        : undefined
    }
    role="banner"
    style={{ zIndex: z }}
    tabIndex={-1}>
    {children}
  </header>
);

SystemBar.displayName = "SystemBar";
