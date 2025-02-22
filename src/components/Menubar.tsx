"use client";

import { Menu } from "@/components";
import { WindowContext } from "@/contexts";
import { useTheme } from "@/hooks";
import { MENU_BAR_ID } from "@/ids";
import type { FunctionComponent, PropsWithChildren } from "react";
import { useContext, useLayoutEffect, useState } from "react";
import { createPortal } from "react-dom";

export const Menubar: FunctionComponent<PropsWithChildren> = ({ children }) => {
  const { current } = useContext(WindowContext);
  const [root, setRoot] = useState<HTMLElement | null>(null);
  const theme = useTheme();

  useLayoutEffect(() => setRoot(document.getElementById(MENU_BAR_ID)), [theme]);

  if (root) {
    return current ? createPortal(children, root) : null;
  }

  return (
    <Menu bar horizontal>
      {children}
    </Menu>
  );
};

Menubar.displayName = "Menubar";
