import { FunctionComponent, useState } from "react";

import { Calendar, Clock } from "@/components";
import { Network } from "@/icons";

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
      {Boolean(isCalendarOpen) && (
        <Calendar
          onClose={() => {
            setIsCalendarOpen(false);
          }}
        />
      )}
    </aside>
  );
};

Tray.displayName = "Tray";
