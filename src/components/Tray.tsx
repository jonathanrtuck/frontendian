import { ComponentProps, FunctionComponent, useEffect, useState } from "react";

import { Applications, Clock } from "@/components";
import { useStore, useStyles } from "@/hooks";
import { Network } from "@/icons";
import { ComponentName } from "@/types";

type ClockProps = ComponentProps<typeof Clock>;

const COMPONENT_NAME: ComponentName = "Tray";
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
  const styles = useStyles(COMPONENT_NAME);

  const dateProps = DATE_STYLE_SHORT;
  const timeProps =
    theme.id === "theme-beos" ? TIME_STYLE_MEDIUM : TIME_STYLE_SHORT;

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

Tray.displayName = COMPONENT_NAME;
