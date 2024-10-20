import { FunctionComponent, useEffect, useState } from "react";

import { Applications, Clock, ClockProps } from "@/components";
import { useStyles } from "@/hooks";
import { Network } from "@/icons";
import { useStore } from "@/store";

import stylesBeos from "./Tray.beos.module.css";
import stylesMacOsClassic from "./Tray.mac-os-classic.module.css";

const DATE_STYLE_SHORT: ClockProps = {
  dateStyle: "short",
};
const TIME_STYLE_MEDIUM: ClockProps = {
  timeStyle: "medium",
};
const TIME_STYLE_SHORT: ClockProps = {
  timeStyle: "short",
};

export const Tray: FunctionComponent = () => {
  const theme = useStore((state) => state.theme);

  const dateProps = DATE_STYLE_SHORT;
  const timeProps =
    theme.id === "theme-beos" ? TIME_STYLE_MEDIUM : TIME_STYLE_SHORT;

  const [clockProps, setClockProps] = useState<ClockProps>(timeProps);

  const styles = useStyles({
    "theme-beos": stylesBeos,
    "theme-mac-os-classic": stylesMacOsClassic,
  });

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

  return (
    <aside className={styles.root}>
      {theme.id === "theme-beos" && (
        <ul className={styles.icons}>
          <li className={styles.icon}>
            <Network />
          </li>
        </ul>
      )}
      <Clock
        {...clockProps}
        onClick={() => {
          setClockProps((prevState) =>
            prevState.timeStyle ? dateProps : timeProps
          );
        }}
      />
      {theme.id === "theme-mac-os-classic" && (
        <>
          <button
            className={styles.button}
            onClick={() => {
              //
            }}
            role="presentation"
            type="button"
          />
          <Applications />
        </>
      )}
    </aside>
  );
};

Tray.displayName = "Tray";
