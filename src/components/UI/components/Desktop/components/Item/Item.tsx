import { FunctionComponent } from "react";

import { File } from "@/icons";
import { IconComponent } from "@/types";

import styles from "./Item.module.css";

export type IconProps = {
  Icon?: IconComponent;
  onClick(): void;
  title: string;
};

export const Item: FunctionComponent<IconProps> = ({
  Icon = File,
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
    <Icon aria-hidden className={styles.icon} />
    <span className={styles.title}>{title}</span>
  </button>
);

Item.displayName = "Item";
