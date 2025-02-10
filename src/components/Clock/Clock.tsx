"use client";

import "./Clock.theme-beos.css";
import "./Clock.theme-mac-os-classic.css";
import { useClock } from "@/hooks";
import { useStore } from "@/store";
import { THEME_BEOS } from "@/themes";
import type { FunctionComponent } from "react";
import { useEffect, useState } from "react";

export const Clock: FunctionComponent = () => {
  const currentThemeId = useStore((store) => store.currentThemeId);
  const date = useClock();
  const [format, setFormat] = useState<"date" | "time">("time");

  useEffect(() => {
    if (format !== "time") {
      const timeout = setTimeout(() => setFormat("time"), 5000);

      return () => clearTimeout(timeout);
    }
  }, [format]);

  return (
    <button
      className="component-clock"
      onClick={() =>
        setFormat((prevState) => (prevState === "time" ? "date" : "time"))
      }
      tabIndex={0}
      type="button">
      <time
        dateTime={date.toISOString().replace(/\.\d+/, "")} // remove milliseconds to prevent (more) frequent dom updates
        title={date.toLocaleDateString(navigator.language, {
          dateStyle: "full",
        })}>
        {format === "date" &&
          date.toLocaleDateString(navigator.language, {
            dateStyle: "short",
          })}
        {format === "time" &&
          date.toLocaleTimeString(navigator.language, {
            timeStyle: currentThemeId === THEME_BEOS.id ? "medium" : "short",
          })}
      </time>
    </button>
  );
};

Clock.displayName = "Clock";
