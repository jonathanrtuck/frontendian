"use client";

import type { FunctionComponent, PropsWithChildren } from "react";

export const Dialog: FunctionComponent<
  PropsWithChildren<{
    modal?: boolean;
    open?: boolean;
    type: "error" | "info";
  }>
> = ({ children, modal, open }) => (
  <dialog className="dialog">{children}</dialog>
);

Dialog.displayName = "Dialog";
