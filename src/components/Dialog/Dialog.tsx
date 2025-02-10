"use client";

import "./Dialog.theme-beos.css";
import { AlertError, AlertInfo } from "@/icons";
import { useStore } from "@/store";
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
    DetailedHTMLProps<
      DialogHTMLAttributes<HTMLDialogElement>,
      HTMLDialogElement
    > & {
      modal?: boolean;
      type: DialogType;
    }
  >
> = ({ children, className, modal, open, type, ...props }) => {
  const currentThemeId = useStore((store) => store.currentThemeId);
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
    <dialog
      {...props}
      className={clsx("component-dialog", className)}
      ref={rootRef}>
      <Icon themeId={currentThemeId} />
      {children}
    </dialog>
  );
};

Dialog.displayName = "Dialog";
