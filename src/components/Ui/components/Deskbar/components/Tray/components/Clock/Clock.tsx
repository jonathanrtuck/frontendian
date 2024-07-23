import { FunctionComponent, useState } from "react";

import { Calendar } from "./components/Calendar";

import styles from "./Clock.module.css";

export type ClockProps = {
  date: Date;
};

export const Clock: FunctionComponent<ClockProps> = ({ date }) => {
  const [isCalendarOpen, setIsCalendarOpen] = useState<boolean>(false);

  return (
    <>
      <button
        className={styles.root}
        onClick={() => {
          setIsCalendarOpen(true);
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
      {isCalendarOpen && (
        <Calendar
          onClose={() => {
            setIsCalendarOpen(false);
          }}
        />
      )}
    </>
  );
};
