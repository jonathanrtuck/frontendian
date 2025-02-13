"use client";

import "./Dialog.theme-beos.css";
import "./Dialog.theme-mac-os-classic.css";
import { Button } from "@/components";
import { Error, Info } from "@/icons";
import { useStore } from "@/store";
import { THEME_BEOS, THEME_MAC_OS_CLASSIC } from "@/themes";
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
  error: Error,
  info: Info,
};

export const Dialog: FunctionComponent<
  PropsWithChildren<
    Omit<
      DetailedHTMLProps<
        DialogHTMLAttributes<HTMLDialogElement>,
        HTMLDialogElement
      >,
      "role"
    > & {
      modal?: boolean;
      onClose?(): void;
      type: DialogType;
    }
  >
> = ({ children, className, modal, onClose, open, type, ...props }) => {
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
      ref={rootRef}
      role="alertdialog">
      <Icon themeId={currentThemeId} />
      {children}
      {currentThemeId === THEME_BEOS.id && onClose ? (
        <footer>
          <Button autoFocus formMethod="dialog" onClick={onClose} type="reset">
            Close
          </Button>
        </footer>
      ) : null}
    </dialog>
  );
};

Dialog.displayName = "Dialog";
