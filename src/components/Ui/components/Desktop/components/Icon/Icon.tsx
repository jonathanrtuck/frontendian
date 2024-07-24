import { FunctionComponent } from "react";

import { File } from "icons";
import { IconComponent } from "types";

import styles from "./Icon.module.css";

export type IconProps = {
  Icon?: IconComponent;
  onClick(): void;
  title: string;
};

export const Icon: FunctionComponent<IconProps> = ({
  Icon = File,
  onClick,
  title,
}) => (
  <button className={styles.root} onDoubleClick={onClick} type="button">
    <Icon aria-hidden className={styles.icon} role="presentation" />
    <span className={styles.title}>{title}</span>
  </button>
);
