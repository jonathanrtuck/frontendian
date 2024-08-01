import { FunctionComponent, useRef } from "react";
import ReactCalendar from "react-calendar";

import { useFocus } from "@/hooks";

import "react-calendar/dist/Calendar.css";

import styles from "./Calendar.module.css";

export type CalendarProps = {
  onClose(): void;
};

// @see https://github.com/wojtekmaj/react-calendar
export const Calendar: FunctionComponent<CalendarProps> = ({ onClose }) => {
  const rootRef = useRef<HTMLElement>(null);

  useFocus({
    deps: [],
    ref: rootRef,
    selector: ".react-calendar__tile--now",
  });

  return (
    <section
      className={styles.root}
      onBlur={({ relatedTarget }) => {
        if (!rootRef.current?.contains(relatedTarget)) {
          onClose();
        }
      }}
      ref={rootRef}
      tabIndex={-1}>
      <ReactCalendar
        className={styles.calendar}
        defaultValue={new Date()}
        formatShortWeekday={(locale, date) =>
          new Intl.DateTimeFormat(locale, {
            weekday: "narrow",
          }).format(date)
        }
        minDetail="month"
        showWeekNumbers
        tileClassName={styles.tile}
      />
    </section>
  );
};
