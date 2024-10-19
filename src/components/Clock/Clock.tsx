import clsx from "clsx";
import { HTMLAttributes, FunctionComponent } from "react";

import { useClock, useStyles } from "@/hooks";

import stylesBeos from "./Clock.beos.module.css";
import stylesMacOsClassic from "./Clock.mac-os-classic.module.css";

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
  const styles = useStyles({
    "theme-beos": stylesBeos,
    "theme-mac-os-classic": stylesMacOsClassic,
  });

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
