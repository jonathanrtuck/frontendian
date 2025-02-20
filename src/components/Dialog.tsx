"use client";

import type { FunctionComponent, PropsWithChildren } from "react";
import { useEffect, useRef } from "react";

export const Dialog: FunctionComponent<
  PropsWithChildren<{
    id?: string;
    labelledby?: string;
  }>
> = ({ children, id, labelledby }) => {
  const rootRef = useRef<HTMLDialogElement>(null);

  useEffect(() => rootRef.current?.showModal(), []);

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
