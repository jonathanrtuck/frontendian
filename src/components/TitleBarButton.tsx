"use client";

import type { FunctionComponent } from "react";

export const TitleBarButton: FunctionComponent<{
  onClick(): void;
  title: string;
}> = ({ onClick, title }) => (
  <button
    className="title-bar-button"
    onClick={onClick}
    title={title}
    type="button"
  />
);

TitleBarButton.displayName = "TitleBarButton";
