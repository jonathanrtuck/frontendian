import { FunctionComponent } from "react";

import { APPLICATION_TRACKER } from "@/applications";
import { Menu, Menuitem } from "@/components/Menu";
import { FILE_README_MD } from "@/files";
import { openApplication, openFile, useStore } from "@/store";

import styles from "./MainMenu.module.css";

export const MainMenu: FunctionComponent = () => {
  const applications = useStore((state) => state.applications);

  return (
    <Menu bar vertical>
      <Menuitem
        className={styles.menuitem}
        classes={{
          button: styles.button,
          title: styles.title,
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
