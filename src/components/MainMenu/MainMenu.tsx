import { FunctionComponent } from "react";

import { APPLICATION_TRACKER } from "@/applications";
import { Menu, Menuitem } from "@/components";
import { FILE_README_MD } from "@/files";
import { Apple, BeOS } from "@/icons";
import { changeTheme, openApplication, openFile, useStore } from "@/store";
import { IconComponent, Theme } from "@/types";
import * as themes from "@/themes";

import styles from "./MainMenu.module.css";

const IconByTheme = ({ id }: Theme): IconComponent | undefined => {
  switch (id) {
    case "theme-beos":
      return BeOS;
    case "theme-mac-os-classic":
      return Apple;
  }
};

export const MainMenu: FunctionComponent = () => {
  const applications = useStore((state) => state.applications);
  const theme = useStore((state) => state.theme);

  return (
    <Menuitem
      Icon={IconByTheme(theme)}
      classes={{
        button: styles.button,
        icon: styles.icon,
        menuitem: styles.root,
        title: "visually-hidden",
      }}
      title="frontendian">
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
  );
};

MainMenu.displayName = "MainMenu";
