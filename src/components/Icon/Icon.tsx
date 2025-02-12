"use client";

import "./Icon.theme-beos.css";
import "./Icon.theme-mac-os-classic.css";
import { File } from "@/icons";
import { useStore } from "@/store";
import type { IconComponent } from "@/types";
import type { FunctionComponent } from "react";

export const Icon: FunctionComponent<{
  Component?: IconComponent;
  onClick(): void;
  title: string;
}> = ({ Component = File, onClick, title }) => {
  const currentThemeId = useStore((store) => store.currentThemeId);

  return (
    <button
      className="component-icon"
      draggable
      onDoubleClick={onClick}
      tabIndex={0}
      title={title}
      type="button">
      <Component aria-hidden themeId={currentThemeId} />
      <label>{title}</label>
    </button>
  );
};

Icon.displayName = "Icon";
