import { FunctionComponent } from "react";

import { APPLICATION_TRACKER } from "@/applications";
import { Menu, Menuitem } from "@/components";
import { FILE_README_MD } from "@/files";
import { useStyles } from "@/hooks";
import { changeTheme, openApplication, openFile, useStore } from "@/store";
import * as themes from "@/themes";

import stylesBeos from "./MainMenu.beos.module.css";
import stylesMacOsClassic from "./MainMenu.mac-os-classic.module.css";

export const MainMenu: FunctionComponent = () => {
  const applications = useStore((state) => state.applications);
  const theme = useStore((state) => state.theme);

  const styles = useStyles({
    "theme-beos": stylesBeos,
    "theme-mac-os-classic": stylesMacOsClassic,
  });

  return (
    <Menu
      bar
      className={styles.root}
      draggable={false}
      horizontal={theme.id === "theme-mac-os-classic"}
      vertical={theme.id === "theme-beos"}>
      <Menuitem
        Icon={theme.menu.Icon}
        className={styles.menuitem}
        classes={{
          button: styles.button,
          icon: styles.icon,
          title: "visually-hidden",
        }}
        title={theme.menu.title}>
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
          <Menuitem separator />
          {applications
            .filter(({ id }) => id !== APPLICATION_TRACKER.id)
            .map(({ Icon, id, title }) => (
              <Menuitem
                Icon={Icon}
                key={id}
                onClick={() => {
                  openApplication({ id });
                }}
                title={title}
              />
            ))}
        </Menu>
      </Menuitem>
    </Menu>
  );
};

MainMenu.displayName = "MainMenu";
