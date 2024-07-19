import { FunctionComponent } from "react";

import { Tray } from "./components/Tray";
import { MenuBar } from "components/MenuBar";
import { MenuItem } from "components/MenuItem";
import { Tracker } from "icons";

import styles from "./Deskbar.module.css";

export const Deskbar: FunctionComponent<{}> = () => (
  <header className={styles.root}>
    <button
      aria-expanded="false"
      aria-haspopup="menu"
      className={styles.button}
      onClick={() => {
        console.debug("menu");
      }}
      type="button">
      frontendian
    </button>
    <Tray />
    <MenuBar orientation="vertical">
      <MenuItem Icon={Tracker} title="Tracker" />
    </MenuBar>
  </header>
);
