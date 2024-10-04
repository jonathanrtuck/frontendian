import clsx from "clsx";
import { HTMLAttributes, FunctionComponent } from "react";

import { useClock } from "@/hooks";

export type ClockProps = Omit<HTMLAttributes<HTMLButtonElement>, "type">;

export const Clock: FunctionComponent<ClockProps> = ({
  className,
  ...props
}) => {
  const date = useClock();

  return (
    <button
      {...props}
      className={clsx(className, "clock")}
      tabIndex={0}
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
  );
};

Clock.displayName = "Clock";
