import { FunctionComponent } from "react";

import { Clock } from "./components/Clock";
import { useClock } from "hooks";
import { Network } from "icons";

import styles from "./Tray.module.css";

export const Tray: FunctionComponent<{}> = () => {
  const date = useClock();

  return (
    <nav className={styles.root}>
      <ul className={styles.icons}>
        <li className={styles.icon}>
          <Network />
        </li>
      </ul>
      <Clock date={date} />
    </nav>
  );
};
