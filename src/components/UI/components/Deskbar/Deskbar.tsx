import { FunctionComponent, useRef } from "react";

import { DESKBAR_ID } from "@/constants";
import { focusDeskbar, useStore } from "@/store";

import { Applications } from "./components/Applications";
import { MainMenu } from "./components/MainMenu";
import { Tray } from "./components/Tray";

import styles from "./Deskbar.module.css";

export const Deskbar: FunctionComponent = () => {
  const stackingOrder = useStore((state) => state.stackingOrder);

  const rootRef = useRef<HTMLElement>(null);

  const zIndex = stackingOrder.indexOf(DESKBAR_ID);
  const isFocused = stackingOrder.at(-1) === DESKBAR_ID;

  return (
    <header
      aria-label="Deskbar"
      className={styles.root}
      id={DESKBAR_ID}
      onFocus={({ relatedTarget }) => {
        if (
          !isFocused &&
          (!relatedTarget || !rootRef.current?.contains(relatedTarget))
        ) {
          focusDeskbar();
        }
      }}
      ref={rootRef}
      style={{
        zIndex,
      }}
      tabIndex={-1}>
      <MainMenu />
      <Tray />
      <Applications />
    </header>
  );
};

Deskbar.displayName = "Deskbar";
