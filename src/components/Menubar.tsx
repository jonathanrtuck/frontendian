"use client";

import { Menu } from "@/components";
import type { FunctionComponent, PropsWithChildren } from "react";
import { createPortal } from "react-dom";

export const Menubar: FunctionComponent<
  PropsWithChildren<{
    global?: boolean;
  }>
> = ({ children, global }) =>
  global ? (
    createPortal(
      <Menu bar horizontal>
        {children}
      </Menu>,
      document.getElementById("")! // @todo
    )
  ) : (
    <Menu bar horizontal>
      {children}
    </Menu>
  );

Menubar.displayName = "Menubar";
