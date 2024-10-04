import { FunctionComponent } from "react";

import { File } from "@/icons";
import { IconComponent } from "@/types";

import styles from "./Icon.module.css";

export type IconProps = {
  Component?: IconComponent;
  onClick(): void;
  title: string;
};

export const Icon: FunctionComponent<IconProps> = ({
  Component = File,
  onClick,
  title,
}) => (
  <button
    className={styles.root}
    draggable
    onDoubleClick={onClick}
    tabIndex={0}
    title={title}
    type="button">
    <Component aria-hidden className={styles.icon} />
    <span className={styles.title}>{title}</span>
  </button>
);

Icon.displayName = "Icon";
