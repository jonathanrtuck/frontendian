import { FunctionComponent, useRef } from "react";

import { DESKBAR_ID } from "@/constants";
import { useStore } from "@/store";

import { Applications } from "./components/Applications";
import { MainMenu } from "./components/MainMenu";
import { Tray } from "./components/Tray";

import styles from "./Deskbar.module.css";

export const Deskbar: FunctionComponent = () => {
  const focus = useStore((actions) => actions.focus);
  const stackingOrder = useStore((state) => state.stackingOrder);

  const rootRef = useRef<HTMLElement>(null);

  return (
    <header
      className={styles.root}
      onFocus={({ relatedTarget }) => {
        if (!relatedTarget || !rootRef.current?.contains(relatedTarget)) {
          focus({ id: DESKBAR_ID });
        }
      }}
      ref={rootRef}
      style={{
        zIndex: stackingOrder.indexOf(DESKBAR_ID),
      }}
      tabIndex={0}>
      <MainMenu />
      <Tray />
      <Applications />
    </header>
  );
};
