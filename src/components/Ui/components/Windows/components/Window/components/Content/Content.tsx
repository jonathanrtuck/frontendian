import { FunctionComponent } from "react";

import styles from "./Content.module.css";

export const Content: FunctionComponent<{
  height?: number;
  width?: number;
}> = ({ height, width }) => (
  <div
    className={styles.root}
    style={{
      height,
      width,
    }}>
    content…
  </div>
);
