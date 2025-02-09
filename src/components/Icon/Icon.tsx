"use client";

import "./Icon.theme-beos.css";
import { File } from "@/icons";
import type { IconComponent } from "@/types";
import type { FunctionComponent } from "react";

export const Icon: FunctionComponent<{
  Component?: IconComponent;
  onClick(): void;
  title: string;
}> = ({ Component = File, onClick, title }) => (
  <button
    className="component-icon"
    draggable
    onDoubleClick={onClick}
    tabIndex={0}
    title={title}
    type="button">
    <Component aria-hidden />
    <label>{title}</label>
  </button>
);

Icon.displayName = "Icon";
