import { FunctionComponent } from "react";

import styles from "./Dialog.module.css";

export type DialogProps = {
  text: string;
};

export const Dialog: FunctionComponent<DialogProps> = ({ text }) => (
  <dialog className={styles.root} open>
    <p className={styles.text}>{text}</p>
  </dialog>
);
