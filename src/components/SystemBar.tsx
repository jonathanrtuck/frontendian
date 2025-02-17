"use client";

import type { FunctionComponent, PropsWithChildren } from "react";

export const SystemBar: FunctionComponent<
  PropsWithChildren<{
    onFocus?(): void;
    title: string;
    z: number;
  }>
> = ({ children, onFocus, title, z }) => (
  <header
    aria-label={title}
    className="system-bar"
    onFocus={({ currentTarget, relatedTarget }) => {
      if (!relatedTarget || !currentTarget.contains(relatedTarget)) {
        onFocus?.();
      }
    }}
    role="banner"
    style={{
      zIndex: z,
    }}>
    {children}
  </header>
);

SystemBar.displayName = "SystemBar";
