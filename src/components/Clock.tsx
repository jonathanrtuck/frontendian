import clsx from "clsx";
import { HTMLAttributes, FunctionComponent } from "react";

import { useClock, useStyles } from "@/hooks";
import { ComponentName } from "@/types";

const COMPONENT_NAME: ComponentName = "Clock";

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
  const date = useClock();
  const styles = useStyles(COMPONENT_NAME);

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

Clock.displayName = COMPONENT_NAME;
