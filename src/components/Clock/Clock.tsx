import clsx from "clsx";
import { HTMLAttributes, FunctionComponent } from "react";

import { useClock } from "@/hooks";

import styles from "./Clock.module.css";

export type ClockProps = Intl.DateTimeFormatOptions &
  Omit<HTMLAttributes<HTMLButtonElement>, "type">;

export const Clock: FunctionComponent<ClockProps> = ({
  className,
  dateStyle,
  dayPeriod,
  formatMatcher,
  fractionalSecondDigits,
  timeStyle,
  ...props
}) => {
  const date = useClock();

  return (
    <button
      {...props}
      className={clsx(className, styles.root)}
      tabIndex={0}
      type="button">
      <time
        // remove milliseconds to prevent (more) frequent dom updates
        dateTime={date.toISOString().replace(/\.\d+/, "")}
        title={date.toLocaleDateString(navigator.language, {
          dateStyle: "full",
        })}>
        {Boolean(dateStyle) &&
          date.toLocaleDateString(navigator.language, {
            dateStyle,
          })}
        {Boolean(timeStyle) &&
          date.toLocaleTimeString(navigator.language, {
            timeStyle,
          })}
      </time>
    </button>
  );
};

Clock.displayName = "Clock";
