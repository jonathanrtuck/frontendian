import { FunctionComponent } from "react";

import styles from "./ControlStrip.module.css";

export const ControlStrip: FunctionComponent = () => {
  //

  return (
    <footer className={styles.root}>
      <button type="button">close…</button>
      menu…
      <button type="button">handle…</button>
    </footer>
  );
};

ControlStrip.displayName = "ControlStrip";
