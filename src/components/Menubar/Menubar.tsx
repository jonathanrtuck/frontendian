import { FunctionComponent, PropsWithChildren, useContext } from "react";
import { createPortal } from "react-dom";

import { MainMenu, Menu } from "@/components";
import { DESKBAR_ID } from "@/constants";
import { WindowContext } from "@/contexts";
import { useStore } from "@/store";

export type MenubarProps = PropsWithChildren;

export const Menubar: FunctionComponent<MenubarProps> = ({ children }) => {
  const { focused, id, menubarRef } = useContext(WindowContext);

  const theme = useStore((state) => state.theme);

  switch (theme.id) {
    case "theme-beos":
      return (
        <Menu bar draggable={false} horizontal ref={menubarRef}>
          {children}
        </Menu>
      );
    case "theme-mac-os-classic":
      return id && focused
        ? createPortal(
            <Menu bar draggable={false} horizontal>
              <MainMenu />
              {children}
            </Menu>,
            document.getElementById(DESKBAR_ID)!
          )
        : null;
  }
};

Menubar.displayName = "Menubar";
