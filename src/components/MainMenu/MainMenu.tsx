"use client";

import { APPLICATION_FILE_MANAGER } from "@/applications";
import { Menu, Menuitem } from "@/components";
import { FILE_README_MD } from "@/files";
import { useStore } from "@/store";
import { THEME_BEOS, THEME_MAC_OS_CLASSIC } from "@/themes";
import type { FunctionComponent } from "react";
import * as styles from "./MainMenu.css";

export const MainMenu: FunctionComponent = () => {
  const applications = useStore((store) => store.applications);
  const currentThemeId = useStore((store) => store.currentThemeId);
  const openApplication = useStore((store) => store.openApplication);
  const openFile = useStore((store) => store.openFile);
  const themes = useStore((store) => store.themes);
  const setTheme = useStore((store) => store.setTheme);
  const theme = themes.find(({ id }) => id === currentThemeId)!;

  return (
    <Menu
      bar
      className={styles.root[currentThemeId]}
      draggable={false}
      horizontal={currentThemeId === THEME_MAC_OS_CLASSIC.id}
      vertical={currentThemeId === THEME_BEOS.id}>
      <Menuitem
        Icon={theme.Icon}
        className={styles.menuitem[currentThemeId]}
        classes={{
          button: styles.button[currentThemeId],
          icon: styles.icon[currentThemeId],
          title: "visually-hidden",
        }}
        title={`${theme.title} Menu`}>
        <Menu>
          <Menuitem
            onClick={() => openFile({ id: FILE_README_MD.id })}
            title={FILE_README_MD.getTitle(theme)}
          />
          <Menuitem separator />
          <Menuitem title="Theme">
            <Menu>
              {Object.values(themes).map(({ id, title }) => (
                <Menuitem
                  checked={id === currentThemeId}
                  key={id}
                  onClick={() => setTheme({ id })}
                  title={title}
                  type="radio"
                />
              ))}
            </Menu>
          </Menuitem>
          <Menuitem separator />
          {applications
            .filter(({ id }) => id !== APPLICATION_FILE_MANAGER.id)
            .map((application) => (
              <Menuitem
                Icon={application.Icon}
                key={application.id}
                onClick={() => openApplication({ id: application.id })}
                title={application.getTitle(theme)}
              />
            ))}
        </Menu>
      </Menuitem>
    </Menu>
  );
};

MainMenu.displayName = "MainMenu";
