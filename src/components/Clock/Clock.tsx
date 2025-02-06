"use client";

import { useClock } from "@/hooks";
import { useStore } from "@/store";
import clsx from "clsx";
import type { FunctionComponent, HTMLAttributes } from "react";
import * as styles from "./Clock.css";

export const Clock: FunctionComponent<
  Intl.DateTimeFormatOptions & Omit<HTMLAttributes<HTMLButtonElement>, "type">
> = ({
  className,
  dateStyle,
  dayPeriod,
  formatMatcher,
  fractionalSecondDigits,
  timeStyle,
  ...props
}) => {
  const currentThemeId = useStore((store) => store.currentThemeId);
  const date = useClock();

  return (
    <button
      {...props}
      className={clsx(className, styles.root[currentThemeId])}
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
