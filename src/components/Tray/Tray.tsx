import clsx from "clsx";
import { FunctionComponent, HTMLAttributes, useEffect, useState } from "react";

import { Calendar, Clock, ClockProps } from "@/components";
import { Network } from "@/icons";
import { useStore } from "@/store";

import styles from "./Tray.module.css";

const DATE_PROP: ClockProps = {
  dateStyle: "short",
};
const TIME_PROP: ClockProps = {
  timeStyle: "short",
};

export type TrayProps = HTMLAttributes<HTMLElement>;

export const Tray: FunctionComponent<TrayProps> = ({ className, ...props }) => {
  const theme = useStore((state) => state.theme);

  const [clockProps, setClockProps] = useState<ClockProps>(TIME_PROP);
  const [isCalendarOpen, setIsCalendarOpen] = useState<boolean>(false);

  useEffect(() => {
    if (clockProps.dateStyle) {
      const timeout = setTimeout(() => {
        setClockProps(TIME_PROP);
      }, 5000);

      return () => {
        clearTimeout(timeout);
      };
    }
  }, [clockProps]);

  if (!theme.menubar.windowed) {
    return (
      <aside {...props} className={clsx(className, styles.root)}>
        <Clock
          {...clockProps}
          onClick={() => {
            setClockProps((prevState) =>
              prevState.timeStyle ? DATE_PROP : TIME_PROP
            );
          }}
        />
      </aside>
    );
  }

  return (
    <aside {...props} className={clsx(className, styles.root)}>
      <ul className={styles.icons}>
        <li className={styles.icon}>
          <Network />
        </li>
      </ul>
      <Clock
        onClick={() => {
          setIsCalendarOpen(true);
        }}
        timeStyle="medium"
      />
      {Boolean(isCalendarOpen) && (
        <Calendar
          onClose={() => {
            setIsCalendarOpen(false);
          }}
        />
      )}
    </aside>
  );
};

Tray.displayName = "Tray";
