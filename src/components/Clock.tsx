import { useClock, useTheme } from "@/hooks";
import { type MS } from "@/types";
import clsx from "clsx";
import {
  type FunctionComponent,
  type TimeHTMLAttributes,
  useEffect,
  useState,
} from "react";

const TIMEOUT_DELAY: MS = 4000;

export const Clock: FunctionComponent<TimeHTMLAttributes<HTMLTimeElement>> = ({
  className,
  ...props
}) => {
  const theme = useTheme();
  const date = useClock();
  const [format, setFormat] = useState<"date" | "time">("time");

  useEffect(() => {
    if (format !== "time") {
      const timeout = setTimeout(() => setFormat("time"), TIMEOUT_DELAY);

      return () => clearTimeout(timeout);
    }
  }, [format]);

  return (
    <time
      {...props}
      className={clsx("clock", className)}
      dateTime={date.toISOString().replace(/\.\d+/, "")} // remove milliseconds to prevent (more) frequent dom updates
      onClick={() =>
        setFormat((prevState) => (prevState === "time" ? "date" : "time"))
      }
      suppressHydrationWarning
      title={date.toLocaleDateString(navigator.language, {
        dateStyle: "full",
      })}>
      {format === "date" &&
        date.toLocaleDateString(navigator.language, {
          dateStyle: "short",
        })}
      {format === "time" &&
        date.toLocaleTimeString(navigator.language, {
          timeStyle: theme === "beos" ? "medium" : "short",
        })}
    </time>
  );
};
