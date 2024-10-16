import clsx from "clsx";
import { FunctionComponent, HTMLAttributes, useEffect, useState } from "react";

import { Applications, Clock, ClockProps } from "@/components";
import { Network } from "@/icons";
import { useStore } from "@/store";

import styles from "./Tray.module.css";

const DATE_STYLE_SHORT: ClockProps = {
  dateStyle: "short",
};
const TIME_STYLE_MEDIUM: ClockProps = {
  timeStyle: "medium",
};
const TIME_STYLE_SHORT: ClockProps = {
  timeStyle: "short",
};

export type TrayProps = HTMLAttributes<HTMLElement>;

export const Tray: FunctionComponent<TrayProps> = ({ className, ...props }) => {
  const theme = useStore((state) => state.theme);

  const dateProps = DATE_STYLE_SHORT;
  const timeProps = theme.components.menubar.windowed
    ? TIME_STYLE_MEDIUM
    : TIME_STYLE_SHORT;

  const [clockProps, setClockProps] = useState<ClockProps>(timeProps);

  useEffect(() => {
    if (clockProps.dateStyle) {
      const timeout = setTimeout(() => {
        setClockProps(timeProps);
      }, 5000);

      return () => {
        clearTimeout(timeout);
      };
    }
  }, [clockProps, timeProps]);

  if (!theme.components.menubar.windowed) {
    return (
      <aside {...props} className={clsx(className, styles.root)}>
        <Clock
          {...clockProps}
          onClick={() => {
            setClockProps((prevState) =>
              prevState.timeStyle ? dateProps : timeProps
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
      <div className={styles.content}>
        <ul className={styles.icons}>
          <li className={styles.icon}>
            <Network />
          </li>
        </ul>
        <Clock
          {...clockProps}
          onClick={() => {
            setClockProps((prevState) =>
              prevState.timeStyle ? dateProps : timeProps
            );
          }}
        />
      </div>
    </aside>
  );
};

Tray.displayName = "Tray";
