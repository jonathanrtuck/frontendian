import { FunctionComponent, PropsWithChildren, useContext } from "react";
import { createPortal } from "react-dom";

import { MainMenu, Menu } from "@/components";
import { DESKBAR_ID } from "@/constants";
import { WindowContext } from "@/contexts";
import { useStyles } from "@/hooks";
import { useStore } from "@/store";

import stylesBeos from "./Menubar.beos.module.css";
import stylesMacOsClassic from "./Menubar.mac-os-classic.module.css";

export type MenubarProps = PropsWithChildren;

export const Menubar: FunctionComponent<MenubarProps> = ({ children }) => {
  const { focused, id, menubarRef } = useContext(WindowContext);

  const theme = useStore((state) => state.theme);

  const styles = useStyles({
    "theme-beos": stylesBeos,
    "theme-mac-os-classic": stylesMacOsClassic,
  });

  switch (theme.id) {
    case "theme-beos":
      return (
        <Menu
          bar
          className={styles.root}
          draggable={false}
          horizontal
          ref={menubarRef}>
          {children}
        </Menu>
      );
    case "theme-mac-os-classic":
      return id && focused
        ? createPortal(
            <Menu bar className={styles.menubar} draggable={false} horizontal>
              <MainMenu />
              {children}
            </Menu>,
            document.getElementById(DESKBAR_ID)!
          )
        : null;
  }
};

Menubar.displayName = "Menubar";
