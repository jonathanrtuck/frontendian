import { FunctionComponent, useRef } from "react";

import { Tray } from "./components/Tray";
import { Menu } from "components/Menu";
import { MenuBar } from "components/MenuBar";
import { MenuItem } from "components/MenuItem";
import { DESKBAR_ID } from "consts";
import { Tracker } from "icons";
import { useStore } from "store";

import styles from "./Deskbar.module.css";

export const Deskbar: FunctionComponent<{}> = () => {
  // state
  const stackingOrder = useStore((state) => state.stackingOrder);
  // actions
  const focus = useStore((actions) => actions.focus);

  const rootRef = useRef<HTMLElement>(null);

  return (
    <header
      className={styles.root}
      onFocus={({ relatedTarget }) => {
        if (!relatedTarget || !rootRef.current?.contains(relatedTarget)) {
          focus({ id: DESKBAR_ID });
        }
      }}
      ref={rootRef}
      style={{
        zIndex: stackingOrder.indexOf(DESKBAR_ID),
      }}>
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
};
