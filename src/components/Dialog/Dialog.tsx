import { FunctionComponent } from "react";

import styles from "./Dialog.module.css";

export const Dialog: FunctionComponent<{
  text: string;
}> = ({ text }) => (
  <dialog className={styles.root} open>
    <p className={styles.text}>{text}</p>
  </dialog>
);
