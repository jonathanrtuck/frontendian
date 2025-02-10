"use client";

import "./MainMenu.theme-beos.css";
import "./MainMenu.theme-mac-os-classic.css";
import { APPLICATION_FILE_MANAGER } from "@/applications";
import { Menu, Menuitem } from "@/components";
import { FILE_README_MD } from "@/files";
import { useStore } from "@/store";
import { THEME_MAC_OS_CLASSIC } from "@/themes";
import type { FunctionComponent } from "react";

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
      className="component-main-menu"
      draggable={false}
      horizontal={currentThemeId === THEME_MAC_OS_CLASSIC.id}>
      <Menuitem Icon={theme.Icon} title={`${theme.title} Menu`}>
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
