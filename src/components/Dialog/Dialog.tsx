"use client";

import { AlertError, AlertInfo } from "@/icons";
import type { IconComponent } from "@/types";
import clsx from "clsx";
import type {
  DetailedHTMLProps,
  DialogHTMLAttributes,
  FunctionComponent,
  PropsWithChildren,
} from "react";
import { useLayoutEffect, useRef } from "react";

type DialogType = "error" | "info";

const ICONS_BY_TYPE: Record<DialogType, IconComponent> = {
  error: AlertError,
  info: AlertInfo,
};

export const Dialog: FunctionComponent<
  PropsWithChildren<
    {
      modal?: boolean;
      type: DialogType;
    } & DetailedHTMLProps<
      DialogHTMLAttributes<HTMLDialogElement>,
      HTMLDialogElement
    >
  >
> = ({ children, className, modal, open, type, ...props }) => {
  const rootRef = useRef<HTMLDialogElement>(null);
  const Icon = ICONS_BY_TYPE[type];

  useLayoutEffect(() => {
    if (open) {
      if (modal) {
        rootRef.current?.showModal();
      } else {
        rootRef.current?.show();
      }
    } else {
      rootRef.current?.close();
    }
  }, [modal, open]);

  return (
    <dialog {...props} className={clsx(className, "")} ref={rootRef}>
      <div className={""}>
        <Icon className={""} />
        {children}
      </div>
    </dialog>
  );
};

Dialog.displayName = "Dialog";
