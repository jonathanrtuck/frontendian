import { FunctionComponent, useRef } from "react";

import { DESKBAR_ID } from "@/constants";
import { focusWindow, useStore } from "@/store";

import { Applications } from "./components/Applications";
import { MainMenu } from "./components/MainMenu";
import { Tray } from "./components/Tray";

import styles from "./Deskbar.module.css";

export const Deskbar: FunctionComponent = () => {
  const stackingOrder = useStore((state) => state.stackingOrder);

  const rootRef = useRef<HTMLElement>(null);

  return (
    <header
      aria-label="Deskbar"
      className={styles.root}
      id={DESKBAR_ID}
      onFocus={({ relatedTarget }) => {
        if (!relatedTarget || !rootRef.current?.contains(relatedTarget)) {
          focusWindow({ id: DESKBAR_ID });
        }
      }}
      ref={rootRef}
      style={{
        zIndex: stackingOrder.indexOf(DESKBAR_ID),
      }}
      tabIndex={-1}>
      <MainMenu />
      <Tray />
      <Applications />
    </header>
  );
};

Deskbar.displayName = "Deskbar";
