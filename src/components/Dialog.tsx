"use client";

import { WindowContext } from "@/contexts";
import { IconComponent, ID } from "@/types";
import {
  type FunctionComponent,
  type PropsWithChildren,
  useEffect,
  useRef,
} from "react";

export const Dialog: FunctionComponent<
  PropsWithChildren<{
    Icon?: IconComponent;
    id: ID;
  }>
> = ({ children, Icon, id }) => {
  const rootRef = useRef<HTMLDialogElement>(null);

  useEffect(() => rootRef.current?.showModal(), []);

  return (
    <dialog
      aria-labelledby={`${id}-title`}
      className="dialog"
      id={id}
      ref={rootRef}>
      {Icon ? <Icon className="dialog-icon" role="presentation" /> : null}
      <WindowContext.Provider value={{ id }}>{children}</WindowContext.Provider>
    </dialog>
  );
};
