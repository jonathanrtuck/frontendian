"use client";

import { useStore } from "@/store";
import { File } from "@/icons";
import type { IconComponent } from "@/types";
import type { FunctionComponent } from "react";
import * as styles from "./Icon.css";

export const Icon: FunctionComponent<{
  Component?: IconComponent;
  onClick(): void;
  title: string;
}> = ({ Component = File, onClick, title }) => {
  const currentThemeId = useStore((store) => store.currentThemeId);

  return (
    <button
      className={styles.root[currentThemeId]}
      draggable
      onDoubleClick={onClick}
      tabIndex={0}
      title={title}
      type="button">
      <Component aria-hidden className={styles.icon[currentThemeId]} />
      <span className={styles.title[currentThemeId]}>{title}</span>
    </button>
  );
};

Icon.displayName = "Icon";
