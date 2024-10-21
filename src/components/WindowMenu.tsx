import { FunctionComponent, PropsWithChildren, useContext } from "react";
import { createPortal } from "react-dom";

import { MainMenu, Menu } from "@/components";
import { SYSTEM_BAR_ID } from "@/constants";
import { WindowContext } from "@/contexts";
import { useStore } from "@/hooks";

export const WindowMenu: FunctionComponent<PropsWithChildren> = ({
  children,
}) => {
  const theme = useStore((state) => state.theme);

  const { focused, id, menubarRef } = useContext(WindowContext);

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
            document.getElementById(SYSTEM_BAR_ID)!
          )
        : null;
  }
};

WindowMenu.displayName = "WindowMenu";
