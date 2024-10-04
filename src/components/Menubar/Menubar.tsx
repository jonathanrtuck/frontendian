import {
  FunctionComponent,
  PropsWithChildren,
  useContext,
  useEffect,
} from "react";

import { Menu } from "@/components";
import { WindowContext } from "@/contexts";
import { useStore } from "@/store";

import styles from "./Menubar.module.css";

export type MenubarProps = PropsWithChildren;

export const Menubar: FunctionComponent<MenubarProps> = ({ children }) => {
  const { active, menubarRef } = useContext(WindowContext);

  const theme = useStore((state) => state.theme);

  useEffect(() => {
    if (!theme.menubar.windowed) {
      console.debug(children); // @todo
    }
  }, [children, theme]);

  if (theme.menubar.windowed) {
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

  return null;
};

Menubar.displayName = "Menubar";
