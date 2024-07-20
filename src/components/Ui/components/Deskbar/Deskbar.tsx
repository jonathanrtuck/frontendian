import { FunctionComponent } from "react";

import { Tray } from "./components/Tray";
import { Menu } from "components/Menu";
import { MenuBar } from "components/MenuBar";
import { MenuItem } from "components/MenuItem";
import { Tracker } from "icons";

import styles from "./Deskbar.module.css";

export const Deskbar: FunctionComponent<{}> = () => (
  <header className={styles.root}>
    <MenuBar orientation="vertical">
      <MenuItem className={styles.menuButton} title="frontendian">
        <Menu>
          <MenuItem title="About frontendian" />
        </Menu>
      </MenuItem>
    </MenuBar>
    <Tray />
    <MenuBar orientation="vertical">
      <MenuItem Icon={Tracker} title="Tracker" />
    </MenuBar>
  </header>
);
