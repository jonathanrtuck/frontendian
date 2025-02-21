"use client";

import { TitleBarContext } from "@/components";
import type { FunctionComponent, PropsWithChildren } from "react";
import { useEffect, useRef } from "react";

export const Dialog: FunctionComponent<
  PropsWithChildren<{
    id?: string;
  }>
> = ({ children, id }) => {
  const rootRef = useRef<HTMLDialogElement>(null);

  useEffect(() => rootRef.current?.showModal(), []);

  return (
    <dialog
      aria-labelledby={`${id}-title`}
      className="dialog"
      id={id}
      ref={rootRef}>
      <TitleBarContext.Provider value={{ id: `${id}-title` }}>
        {children}
      </TitleBarContext.Provider>
    </dialog>
  );
};

Dialog.displayName = "Dialog";
