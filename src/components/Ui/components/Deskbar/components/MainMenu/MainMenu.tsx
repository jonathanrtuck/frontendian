import { FunctionComponent } from "react";

import { APPLICATION_TRACKER } from "applications";
import { Menu } from "components/Menu";
import { MenuItem } from "components/MenuItem";
import { FILE_README_MD } from "files";
import { useStore } from "store";

import styles from "./MainMenu.module.css";

export const MainMenu: FunctionComponent = () => {
  const open = useStore((actions) => actions.open);
  const applications = useStore((state) => state.applications);

  return (
    <Menu bar vertical>
      <MenuItem
        className={styles.menuItem}
        classes={{
          title: styles.menuItemTitle,
        }}
        title="frontendian">
        <Menu>
          <MenuItem
            onClick={() => {
              open({ id: FILE_README_MD.id, type: "file" });
            }}
            title="About frontendian"
          />
          <MenuItem separator />
          {applications
            .filter(({ id }) => id !== APPLICATION_TRACKER.id)
            .map(({ Icon, id, title }) => (
              <MenuItem
                Icon={Icon}
                key={id}
                onClick={() => {
                  open({ id, type: "application" });
                }}
                title={title}
              />
            ))}
        </Menu>
      </MenuItem>
    </Menu>
  );
};
