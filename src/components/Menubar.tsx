"use client";

import { Menu } from "@/components";
import { useTheme } from "@/hooks";
import { MENU_BAR_ID } from "@/ids";
import type { FunctionComponent, PropsWithChildren } from "react";
import { useLayoutEffect, useState } from "react";
import { createPortal } from "react-dom";

export const Menubar: FunctionComponent<PropsWithChildren> = ({ children }) => {
  const [root, setRoot] = useState<HTMLElement | null>(null);
  const theme = useTheme();

  useLayoutEffect(() => setRoot(document.getElementById(MENU_BAR_ID)), [theme]);

  return root ? (
    createPortal(children, root)
  ) : (
    <Menu bar horizontal>
      {children}
    </Menu>
  );
};

Menubar.displayName = "Menubar";
