"use client";

import { Menu } from "@/components";
import { MENU_BAR_ID } from "@/ids";
import type { FunctionComponent, PropsWithChildren } from "react";
import { createPortal } from "react-dom";

export const Menubar: FunctionComponent<PropsWithChildren> = ({ children }) =>
  document.getElementById(MENU_BAR_ID) ? (
    createPortal(children, document.getElementById(MENU_BAR_ID)!)
  ) : (
    <Menu bar horizontal>
      {children}
    </Menu>
  );

Menubar.displayName = "Menubar";
