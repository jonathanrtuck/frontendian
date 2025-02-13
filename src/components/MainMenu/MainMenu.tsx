"use client";

import "./MainMenu.theme-beos.css";
import "./MainMenu.theme-mac-os-classic.css";
import * as applications from "@/applications";
import { Menu, Menuitem } from "@/components";
import { FILE_README_MD } from "@/files";
import { useStore } from "@/store";
import * as themes from "@/themes";
import type { Application } from "@/types";
import type { FunctionComponent } from "react";
import { useMemo } from "react";

export const MainMenu: FunctionComponent = () => {
  const openApplication = useStore((store) => store.openApplication);
  const openFile = useStore((store) => store.openFile);
  const setTheme = useStore((store) => store.setTheme);
  const themeId = useStore((store) => store.themeId);
  const theme = Object.values(themes).find(({ id }) => id === themeId)!;
  const sortedApplications = useMemo<Application[]>(
    () =>
      Object.values(applications)
        .sort((a, b) =>
          a.getTitle({ themeId }).localeCompare(b.getTitle({ themeId }))
        )
        .filter(({ id }) => id !== applications.APPLICATION_FILE_MANAGER.id),
    [themeId]
  );

  return (
    <Menu
      bar
      className="component-main-menu"
      draggable={false}
      horizontal={themeId === themes.THEME_MAC_OS_CLASSIC.id}>
      <Menuitem Icon={theme.Icon} title={`${theme.title} Menu`}>
        <Menu>
          <Menuitem
            onClick={() => openFile({ id: FILE_README_MD.id })}
            title={FILE_README_MD.getTitle({ themeId })}
          />
          <Menuitem separator />
          <Menuitem title="Theme">
            <Menu>
              {Object.values(themes).map(({ id, title }) => (
                <Menuitem
                  checked={id === themeId}
                  key={id}
                  onClick={() => setTheme({ id })}
                  title={title}
                  type="radio"
                />
              ))}
            </Menu>
          </Menuitem>
          <Menuitem separator />
          {sortedApplications.map((application) => (
            <Menuitem
              Icon={application.Icon}
              key={application.id}
              onClick={() => openApplication({ id: application.id })}
              title={application.getTitle({ themeId })}
            />
          ))}
        </Menu>
      </Menuitem>
    </Menu>
  );
};

MainMenu.displayName = "MainMenu";
