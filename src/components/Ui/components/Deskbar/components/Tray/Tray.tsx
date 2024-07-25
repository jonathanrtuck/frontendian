import { FunctionComponent, useState } from "react";

import { Network } from "@/icons";

import { Calendar } from "./components/Calendar";
import { Clock } from "./components/Clock";

import styles from "./Tray.module.css";

export const Tray: FunctionComponent = () => {
  const [isCalendarOpen, setIsCalendarOpen] = useState<boolean>(false);

  return (
    <aside className={styles.root}>
      <ul className={styles.icons}>
        <li className={styles.icon}>
          <Network />
        </li>
      </ul>
      <Clock
        onClick={() => {
          setIsCalendarOpen(true);
        }}
      />
      {isCalendarOpen && (
        <Calendar
          onClose={() => {
            setIsCalendarOpen(false);
          }}
        />
      )}
    </aside>
  );
};
