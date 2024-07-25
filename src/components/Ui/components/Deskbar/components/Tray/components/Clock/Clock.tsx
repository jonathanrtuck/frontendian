import clsx from "clsx";
import { HTMLAttributes, FunctionComponent } from "react";

import { useClock } from "@/hooks";

import styles from "./Clock.module.css";

export type ClockProps = HTMLAttributes<HTMLButtonElement>;

export const Clock: FunctionComponent<ClockProps> = ({
  className,
  ...restProps
}) => {
  const date = useClock();

  return (
    <button
      {...restProps}
      className={clsx(className, styles.root)}
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
