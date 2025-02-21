"use client";

import type { IconComponent } from "@/types";
import type { FunctionComponent } from "react";

export const Icon: FunctionComponent<{
  Icon: IconComponent;
  onDoubleClick(): void;
  title: string;
}> = ({ Icon, onDoubleClick, title }) => (
  <button
    className="icon"
    onDoubleClick={onDoubleClick}
    onKeyDown={({ key }) =>
      key === "Enter" || key === " " ? onDoubleClick() : undefined
    }
    title={title}
    type="button">
    <Icon />
    <label>{title}</label>
  </button>
);

Icon.displayName = "Icon";
