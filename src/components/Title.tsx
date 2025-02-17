"use client";

import type { FunctionComponent, PropsWithChildren } from "react";

export const Title: FunctionComponent<
  PropsWithChildren<{
    id: string;
    title: string;
  }>
> = ({ children, id, title }) => (
  <h1 className="title" id={id} title={title}>
    {children}
  </h1>
);

Title.displayName = "Title";
