"use client";

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
import * as styles from "./Dialog.css";

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
  const themes = useStore((store) => store.themes);
  const rootRef = useRef<HTMLDialogElement>(null);
  const Icon = ICONS_BY_TYPE[type];
  const theme = themes.find(({ id }) => id === currentThemeId)!;

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
      className={clsx(className, styles.root[currentThemeId])}
      ref={rootRef}>
      <div className={styles.content[currentThemeId]}>
        <Icon className={styles.icon[currentThemeId]} theme={theme} />
        {children}
      </div>
    </dialog>
  );
};

Dialog.displayName = "Dialog";
