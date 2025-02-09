"use client";

import "./Tray.theme-beos.css";
import { Applications } from "@/components";
import { Network } from "@/icons";
import { useStore } from "@/store";
import { THEME_BEOS, THEME_MAC_OS_CLASSIC } from "@/themes";
import dynamic from "next/dynamic";
import type { ComponentProps, FunctionComponent } from "react";
import { useEffect, useState } from "react";

// @see https://nextjs.org/docs/messages/react-hydration-error
const Clock = dynamic(() => import("../Clock").then(({ Clock }) => Clock), {
  ssr: false,
});

type ClockProps = ComponentProps<typeof Clock>;

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
  const currentThemeId = useStore((store) => store.currentThemeId);
  const dateProps = DATE_STYLE_SHORT;
  const timeProps =
    currentThemeId === THEME_BEOS.id ? TIME_STYLE_MEDIUM : TIME_STYLE_SHORT;
  const [clockProps, setClockProps] = useState<ClockProps>(timeProps);

  useEffect(() => {
    if (clockProps.dateStyle) {
      const timeout = setTimeout(() => setClockProps(timeProps), 5000);

      return () => clearTimeout(timeout);
    }
  }, [clockProps, timeProps]);

  return (
    <aside className="component-tray">
      {currentThemeId === THEME_BEOS.id && (
        <menu>
          <li>
            <Network />
          </li>
        </menu>
      )}
      <Clock
        {...clockProps}
        onClick={() =>
          setClockProps((prevState) =>
            prevState.timeStyle ? dateProps : timeProps
          )
        }
      />
      {currentThemeId === THEME_MAC_OS_CLASSIC.id && (
        <>
          <button onClick={() => {}} role="presentation" type="button" />
          <Applications />
        </>
      )}
    </aside>
  );
};

Tray.displayName = "Tray";
