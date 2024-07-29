import { FunctionComponent, PropsWithChildren, useContext } from "react";

import { Menu } from "@/components/Menu";
import { WindowContext } from "@/contexts";

import styles from "./Menubar.module.css";

export type MenubarProps = PropsWithChildren;

export const Menubar: FunctionComponent<MenubarProps> = ({ children }) => {
  const { menubarRef } = useContext(WindowContext);

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
};
