import {
  FunctionComponent,
  PropsWithChildren,
  useContext,
  useEffect,
} from "react";

import { Menu } from "@/components/Menu";
import { WindowContext } from "@/contexts";
import { useStore } from "@/store";

import styles from "./Menubar.module.css";

export type MenubarProps = PropsWithChildren;

export const Menubar: FunctionComponent<MenubarProps> = ({ children }) => {
  const settings = useStore((state) => state.settings);

  const { active, menubarRef } = useContext(WindowContext);

  useEffect(() => {
    if (settings.theme === "mac-os-classic") {
      console.debug(children);
    }
  }, [children, settings.theme]);

  switch (settings.theme) {
    case "mac-os-classic":
      return null;
    default:
      return (
        <Menu
          bar
          className={styles.root}
          draggable={false}
          horizontal
          inert={!active ? "" : undefined}
          ref={menubarRef}>
          {children}
        </Menu>
      );
  }
};

Menubar.displayName = "Menubar";
