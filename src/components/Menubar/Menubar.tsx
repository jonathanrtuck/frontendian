import {
  FunctionComponent,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";
import { createPortal } from "react-dom";

import { Clock, ClockProps, Menu, Menuitem } from "@/components";
import { MENUBAR_ID } from "@/constants";
import { WindowContext } from "@/contexts";
import { Apple } from "@/icons";
import { blurWindow, useStore } from "@/store";

import styles from "./Menubar.module.css";

const DATE_PROP: ClockProps = {
  dateStyle: "short",
};
const TIME_PROP: ClockProps = {
  timeStyle: "short",
};

export type MenubarProps = PropsWithChildren;

export const Menubar: FunctionComponent<MenubarProps> = ({ children }) => {
  const { active, focused, id, menubarRef } = useContext(WindowContext);

  const theme = useStore((state) => state.theme);
  const windows = useStore((state) => state.windows);

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

  if (theme.menubar.windowed) {
    return (
      <Menu
        bar
        className={styles.root}
        draggable={false}
        horizontal
        inert={!active ? "" : undefined}
        ref={menubarRef}>
        {children}
      </Menu>
    );
  }

  const appleMenuitem = (
    <Menuitem Icon={Apple} classes={{ title: "visually-hidden" }} title="Apple">
      <Menu>
        <Menuitem title="menuitem…" />
      </Menu>
    </Menuitem>
  );

  if (id) {
    return focused
      ? createPortal(
          <Menu bar className={styles.menubar} draggable="false" horizontal>
            {appleMenuitem}
            {children}
          </Menu>,
          document.getElementById(MENUBAR_ID)!
        )
      : null;
  }

  const focusedWindowId = windows.find(({ focused }) => focused)?.id;

  return (
    <header
      className={styles.root}
      id={MENUBAR_ID}
      onBlur={(e) => {
        if (
          document.hasFocus() &&
          focusedWindowId &&
          !e.currentTarget?.contains(e.relatedTarget) &&
          !document.getElementById(focusedWindowId)?.contains(e.relatedTarget)
        ) {
          blurWindow({ id: focusedWindowId });
        }
      }}
      tabIndex={-1}>
      {!focusedWindowId && (
        <Menu bar className={styles.menubar} draggable="false" horizontal>
          {appleMenuitem}
        </Menu>
      )}
      <Clock
        {...clockProps}
        className={styles.clock}
        onClick={() => {
          setClockProps((prevState) =>
            prevState.timeStyle ? DATE_PROP : TIME_PROP
          );
        }}
      />
    </header>
  );
};

Menubar.displayName = "Menubar";
