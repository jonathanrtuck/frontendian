import { FunctionComponent } from "react";

import { APPLICATION_TRACKER } from "@/applications";
import { Menu } from "@/components/Menu";
import { Menuitem } from "@/components/Menuitem";
import { FILE_README_MD } from "@/files";
import { useStore } from "@/store";

import styles from "./MainMenu.module.css";

export const MainMenu: FunctionComponent = () => {
  const openApplication = useStore((actions) => actions.openApplication);
  const openFile = useStore((actions) => actions.openFile);
  const applications = useStore((state) => state.applications);

  return (
    <Menu bar vertical>
      <Menuitem
        className={styles.menuitem}
        classes={{
          title: styles.menuitemTitle,
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
