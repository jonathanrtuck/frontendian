"use client";

import type { FunctionComponent, PropsWithChildren } from "react";
import { Children } from "react";

export const TrayIcons: FunctionComponent<PropsWithChildren> = ({
  children,
}) => (
  <menu className="tray-icons">
    {Children.map(children, (child) => (
      <li>{child}</li>
    ))}
  </menu>
);

TrayIcons.displayName = "TrayIcons";
