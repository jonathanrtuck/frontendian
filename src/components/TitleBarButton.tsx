"use client";

import { type FunctionComponent } from "react";

export const TitleBarButton: FunctionComponent<{
  onClick(): void;
  title: string;
}> = ({ onClick, title }) => (
  <button
    aria-label={title}
    className="title-bar-button"
    draggable={false}
    onClick={onClick}
    title={title}
    type="button"
  />
);
