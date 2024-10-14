import clsx from "clsx";
import { FunctionComponent, HTMLAttributes, useEffect, useState } from "react";

import { Applications, Clock, ClockProps } from "@/components";
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

  if (!theme.components.menubar.windowed) {
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
        <button
          className={styles.button}
          onClick={() => {
            //
          }}
          role="presentation"
          type="button"
        />
        <Applications />
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
        {...clockProps}
        onClick={() => {
          setClockProps((prevState) =>
            prevState.timeStyle ? DATE_PROP : TIME_PROP
          );
        }}
      />
    </aside>
  );
};

Tray.displayName = "Tray";
