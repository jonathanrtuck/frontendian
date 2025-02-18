"use client";

import type { FunctionComponent, PropsWithChildren } from "react";

export const Content: FunctionComponent<
  PropsWithChildren<{
    scrollable?: boolean;
  }>
> = ({ children, scrollable }) => (
  <div className="content">
    <div>{children}</div>
  </div>
);

Content.displayName = "Content";
