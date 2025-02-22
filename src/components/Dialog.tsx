"use client";

import { WindowContext } from "@/contexts";
import type { FunctionComponent, PropsWithChildren } from "react";
import { useEffect, useRef } from "react";

export const Dialog: FunctionComponent<PropsWithChildren<{ id: string }>> = ({
  children,
  id,
}) => {
  const rootRef = useRef<HTMLDialogElement>(null);

  useEffect(() => rootRef.current?.showModal(), []);

  return (
    <dialog
      aria-labelledby={`${id}-title`}
      className="dialog"
      id={id}
      ref={rootRef}>
      <WindowContext.Provider
        value={{
          current: true,
          id,
          width: "auto",
        }}>
        {children}
      </WindowContext.Provider>
    </dialog>
  );
};

Dialog.displayName = "Dialog";
