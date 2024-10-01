import { FunctionComponent, PropsWithChildren } from "react";

import { Menu } from "@/components/Menu";

import styles from "./Menubar.module.css";

export type MenubarProps = PropsWithChildren;

export const Menubar: FunctionComponent<MenubarProps> = ({ children }) => {
  return (
    <Menu bar className={styles.root} draggable={false} horizontal>
      {children}
    </Menu>
  );
};

Menubar.displayName = "Menubar";
