"use client";

import { Menu } from "@/components";
import { WindowContext } from "@/contexts";
import { useStore } from "@/store";
import { THEME_BEOS, THEME_MAC_OS_CLASSIC } from "@/themes";
import type { FunctionComponent, PropsWithChildren } from "react";
import { useContext } from "react";
import { createPortal } from "react-dom";

export const WindowMenu: FunctionComponent<PropsWithChildren> = ({
  children,
}) => {
  const currentThemeId = useStore((state) => state.currentThemeId);
  const { focused, id, menubarRef } = useContext(WindowContext);

  switch (currentThemeId) {
    case THEME_BEOS.id:
      return (
        <Menu bar draggable={false} horizontal ref={menubarRef}>
          {children}
        </Menu>
      );
    case THEME_MAC_OS_CLASSIC.id:
      return id && focused
        ? createPortal(
            children,
            document.querySelector(".component-main-menu")!
          )
        : null;
  }
};

WindowMenu.displayName = "WindowMenu";
