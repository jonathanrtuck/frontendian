import clsx from "clsx";
import { FunctionComponent, HTMLAttributes } from "react";

import styles from "./Content.module.css";

export const Content: FunctionComponent<
  HTMLAttributes<HTMLDivElement> & {
    height?: number;
    width?: number;
  }
> = ({ className, height, width, ...props }) => (
  <div
    {...props}
    className={clsx(className, styles.root)}
    style={{
      height,
      width,
    }}>
    content…
  </div>
);
