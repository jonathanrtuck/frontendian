"use client";

import { Menu } from "@/components";
import type { FunctionComponent, PropsWithChildren } from "react";

export const Menubar: FunctionComponent<
  PropsWithChildren<{
    vertical?: boolean;
  }>
> = ({ children, vertical }) => (
  <Menu bar horizontal={!vertical}>
    {children}
  </Menu>
);

Menubar.displayName = "Menubar";
