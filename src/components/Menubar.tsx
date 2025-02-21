"use client";

import { Menu } from "@/components";
import { useTheme } from "@/hooks";
import { MENU_BAR_ID } from "@/ids";
import type { FunctionComponent, PropsWithChildren } from "react";
import { createPortal } from "react-dom";

export const Menubar: FunctionComponent<PropsWithChildren> = ({ children }) => {
  const theme = useTheme();

  switch (theme) {
    case "mac-os-classic":
      return createPortal(children, document.getElementById(MENU_BAR_ID)!);
    default:
      return (
        <Menu bar horizontal>
          {children}
        </Menu>
      );
  }
};

Menubar.displayName = "Menubar";
