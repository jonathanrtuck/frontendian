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
  const { active, menubarRef } = useContext(WindowContext);

  const settings = useStore((state) => state.settings);

  useEffect(() => {
    if (settings.theme === "MacOSClassic") {
      console.debug(children);
    }
  }, [children, settings.theme]);

  switch (settings.theme) {
    case "MacOSClassic":
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
