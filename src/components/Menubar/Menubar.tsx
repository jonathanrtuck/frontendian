import { FunctionComponent, PropsWithChildren, useContext } from "react";
import { createPortal } from "react-dom";

import { MainMenu, Menu, Tray } from "@/components";
import { MENUBAR_ID } from "@/constants";
import { WindowContext } from "@/contexts";
import { blurWindow, useStore } from "@/store";

import styles from "./Menubar.module.css";

export type MenubarProps = PropsWithChildren;

export const Menubar: FunctionComponent<MenubarProps> = ({ children }) => {
  const { focused, id, menubarRef } = useContext(WindowContext);

  const theme = useStore((state) => state.theme);
  const windows = useStore((state) => state.windows);

  if (theme.components.menubar.windowed) {
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
  }

  if (id) {
    return focused
      ? createPortal(
          <Menu bar className={styles.menubar} draggable="false" horizontal>
            <MainMenu />
            {children}
          </Menu>,
          document.getElementById(MENUBAR_ID)!
        )
      : null;
  }

  const focusedWindowId = windows.find(({ focused }) => focused)?.id;

  return (
    <header
      className={styles.root}
      id={MENUBAR_ID}
      onBlur={(e) => {
        if (
          document.hasFocus() &&
          focusedWindowId &&
          !e.currentTarget?.contains(e.relatedTarget) &&
          !document.getElementById(focusedWindowId)?.contains(e.relatedTarget)
        ) {
          blurWindow({ id: focusedWindowId });
        }
      }}
      tabIndex={-1}>
      {!focusedWindowId && (
        <Menu bar className={styles.menubar} draggable="false" horizontal>
          <MainMenu />
        </Menu>
      )}
      <Tray className={styles.tray} />
    </header>
  );
};

Menubar.displayName = "Menubar";
