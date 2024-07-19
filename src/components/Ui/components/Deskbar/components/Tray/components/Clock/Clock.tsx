import { FunctionComponent } from "react";

import styles from "./Clock.module.css";

export const Clock: FunctionComponent<{
  date: Date;
}> = ({ date }) => (
  <button
    className={styles.root}
    onClick={() => {
      console.debug("calendar");
    }}
    type="button">
    <time
      dateTime={date.toISOString()}
      title={date.toLocaleDateString(navigator.language, {
        dateStyle: "full",
      })}>
      {date.toLocaleTimeString(navigator.language)}
    </time>
  </button>
);
