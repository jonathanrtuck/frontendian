import { FunctionComponent, useEffect, useState } from "react";

import { Clock } from "./components/Clock";
import { Network } from "icons";

import styles from "./Tray.module.css";

export const Tray: FunctionComponent<{}> = () => {
  const [date, setDate] = useState<Date>(new Date());

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    // first use timeout in order to get second tick interval to align with system clock
    const timeout = setTimeout(() => {
      interval = setInterval(() => {
        setDate(new Date());
      }, 1000);

      setDate(new Date());
    }, 1000 - new Date().getMilliseconds());

    return () => {
      clearTimeout(timeout);
      clearInterval(interval);
    };
  }, []);

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
