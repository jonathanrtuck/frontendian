"use client";

import type { FunctionComponent, PropsWithChildren } from "react";

export const SystemBar: FunctionComponent<PropsWithChildren> = ({
  children,
}) => <header className="system-bar">{children}</header>;

SystemBar.displayName = "SystemBar";
