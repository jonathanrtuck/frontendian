"use client";

import type { FunctionComponent, PropsWithChildren } from "react";
import { useEffect, useRef } from "react";

export const Dialog: FunctionComponent<
  PropsWithChildren<{
    id?: string;
    labelledby?: string;
    open?: boolean;
  }>
> = ({ children, id, labelledby, open }) => {
  const rootRef = useRef<HTMLDialogElement>(null);

  useEffect(() => rootRef.current?.[open ? "showModal" : "close"](), [open]);

  return (
    <dialog
      aria-labelledby={labelledby}
      className="dialog"
      id={id}
      ref={rootRef}>
      {children}
    </dialog>
  );
};

Dialog.displayName = "Dialog";
