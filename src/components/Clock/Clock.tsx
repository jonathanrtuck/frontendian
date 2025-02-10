"use client";

import "./Clock.theme-beos.css";
import "./Clock.theme-mac-os-classic.css";
import { useClock } from "@/hooks";
import clsx from "clsx";
import type {
  DetailedHTMLProps,
  FunctionComponent,
  HTMLAttributes,
} from "react";

export const Clock: FunctionComponent<
  Omit<
    DetailedHTMLProps<HTMLAttributes<HTMLButtonElement>, HTMLButtonElement>,
    "type"
  > &
    Pick<Intl.DateTimeFormatOptions, "dateStyle" | "timeStyle">
> = ({ className, dateStyle, timeStyle, ...props }) => {
  const date = useClock();

  return (
    <button
      {...props}
      className={clsx("component-clock", className)}
      tabIndex={0}
      type="button">
      <time
        dateTime={date.toISOString().replace(/\.\d+/, "")} // remove milliseconds to prevent (more) frequent dom updates
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
