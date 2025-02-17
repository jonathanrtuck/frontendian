"use client";

import type { FunctionComponent, PropsWithChildren } from "react";

export const Tray: FunctionComponent<PropsWithChildren> = ({ children }) => (
  <aside className="tray">{children}</aside>
);

Tray.displayName = "Tray";
