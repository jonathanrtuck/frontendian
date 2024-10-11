import { FunctionComponent, PropsWithChildren, useContext } from "react";
import { createPortal } from "react-dom";

import { Menu, Menuitem, Tray } from "@/components";
import { MENUBAR_ID } from "@/constants";
import { WindowContext } from "@/contexts";
import { FILE_README_MD } from "@/files";
import { Apple } from "@/icons";
import { blurWindow, changeTheme, openFile, useStore } from "@/store";
import * as themes from "@/themes";

import styles from "./Menubar.module.css";

export type MenubarProps = PropsWithChildren;

export const Menubar: FunctionComponent<MenubarProps> = ({ children }) => {
  const { active, focused, id, menubarRef } = useContext(WindowContext);

  const theme = useStore((state) => state.theme);
  const windows = useStore((state) => state.windows);

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

  const appleMenuitem = (
    <Menuitem Icon={Apple} classes={{ title: "visually-hidden" }} title="Apple">
      <Menu>
        <Menuitem
          onClick={() => {
            openFile({ id: FILE_README_MD.id });
          }}
          title={FILE_README_MD.title}
        />
        <Menuitem separator />
        <Menuitem title="Theme">
          <Menu>
            {Object.values(themes).map(({ id, title }) => (
              <Menuitem
                checked={id === theme.id}
                key={id}
                onClick={() => {
                  changeTheme({ id });
                }}
                title={title}
                type="radio"
              />
            ))}
          </Menu>
        </Menuitem>
      </Menu>
    </Menuitem>
  );

  if (id) {
    return focused
      ? createPortal(
          <Menu bar className={styles.menubar} draggable="false" horizontal>
            {appleMenuitem}
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
          {appleMenuitem}
        </Menu>
      )}
      <Tray className={styles.tray} />
    </header>
  );
};

Menubar.displayName = "Menubar";
