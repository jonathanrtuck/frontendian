"use client";

import type { FunctionComponent, PropsWithChildren } from "react";

export const Scrollable: FunctionComponent<PropsWithChildren> = ({
  children,
}) => (
  <div className="scrollable">
    <div>{children}</div>
  </div>
);

Scrollable.displayName = "Scrollable";
