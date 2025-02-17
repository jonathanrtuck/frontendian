"use client";

import type { Coordinates } from "@/types";
import type { FunctionComponent, PropsWithChildren } from "react";

export const TitleBar: FunctionComponent<
  PropsWithChildren<{
    onDoubleClick?(): void;
    onDrag?(coordinates: Coordinates): void;
  }>
> = ({ children, onDoubleClick, onDrag }) => (
  <header className="title-bar">{children}</header>
);

TitleBar.displayName = "TitleBar";
