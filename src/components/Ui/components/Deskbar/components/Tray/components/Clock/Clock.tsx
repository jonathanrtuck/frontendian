import { FunctionComponent, useState } from "react";

import { useClock } from "@/hooks";

import { Calendar } from "./components/Calendar";

import styles from "./Clock.module.css";

export const Clock: FunctionComponent = () => {
  const [isCalendarOpen, setIsCalendarOpen] = useState<boolean>(false);

  const date = useClock();

  return (
    <>
      <button
        className={styles.root}
        onClick={() => {
          setIsCalendarOpen(true);
        }}
        type="button">
        <time
          // remove milliseconds to prevent (more) frequent dom updates
          dateTime={date.toISOString().replace(/\.\d+/, "")}
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
