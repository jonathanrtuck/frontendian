"use client";

import type { IconComponent, MS } from "@/types";
import type { FunctionComponent } from "react";
import { useRef } from "react";

export const Icon: FunctionComponent<{
  Icon: IconComponent;
  onDoubleClick(): void;
  title: string;
}> = ({ Icon, onDoubleClick, title }) => {
  const touchRef = useRef<MS>(0);

  return (
    <button
      className="icon"
      onDoubleClick={onDoubleClick}
      onKeyDown={(e) =>
        e.key === "Enter" || e.key === " " ? onDoubleClick() : undefined
      }
      onPointerUp={
        onDoubleClick
          ? () => {
              const now = Date.now();
              const isDoubleClick = now - touchRef.current < 500;

              if (isDoubleClick) {
                onDoubleClick();
              }

              touchRef.current = now;
            }
          : undefined
      }
      title={title}
      type="button">
      <Icon />
      <label>{title}</label>
    </button>
  );
};

Icon.displayName = "Icon";
