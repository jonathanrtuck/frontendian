import { FunctionComponent } from "react";

import { Network } from "@/icons";

import { Clock } from "./components/Clock";

import styles from "./Tray.module.css";

export const Tray: FunctionComponent = () => (
  <aside className={styles.root}>
    <ul className={styles.icons}>
      <li className={styles.icon}>
        <Network />
      </li>
    </ul>
    <Clock />
  </aside>
);
