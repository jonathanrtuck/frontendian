import {
  FocusEvent,
  FunctionComponent,
  useCallback,
  useEffect,
  useRef,
} from "react";
import ReactCalendar from "react-calendar";

import "react-calendar/dist/Calendar.css";

import styles from "./Calendar.module.css";

// @see https://github.com/wojtekmaj/react-calendar
export const Calendar: FunctionComponent<{
  onClose(): void;
}> = ({ onClose }) => {
  const rootRef = useRef<HTMLElement>(null);

  const onBlur = useCallback(
    (e: FocusEvent) => {
      if (!rootRef.current?.contains(e.relatedTarget)) {
        onClose();
      }
    },
    [onClose]
  );

  useEffect(() => {
    // set focus (to today) on mount
    (
      rootRef.current?.querySelector(
        ".react-calendar__tile--now"
      ) as HTMLElement
    )?.focus();
  }, []);

  return (
    <section
      className={styles.root}
      onBlur={onBlur}
      ref={rootRef}
      tabIndex={-1}>
      <ReactCalendar
        className={styles.calendar}
        formatShortWeekday={(locale: string | undefined, date: Date) =>
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
