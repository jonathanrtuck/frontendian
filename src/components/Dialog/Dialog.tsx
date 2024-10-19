import clsx from "clsx";
import {
  DetailedHTMLProps,
  DialogHTMLAttributes,
  FunctionComponent,
  PropsWithChildren,
  useLayoutEffect,
  useRef,
} from "react";

import { useStyles } from "@/hooks";
import { AlertError, AlertInfo } from "@/icons";
import { IconComponent } from "@/types";

import stylesBeos from "./Dialog.beos.module.css";
import stylesMacOsClassic from "./Dialog.mac-os-classic.module.css";

type DialogType = "error" | "info";

const ICONS_BY_TYPE: Record<DialogType, IconComponent> = {
  error: AlertError,
  info: AlertInfo,
};

export type DialogProps = PropsWithChildren<
  {
    modal?: boolean;
    type: DialogType;
  } & DetailedHTMLProps<
    DialogHTMLAttributes<HTMLDialogElement>,
    HTMLDialogElement
  >
>;

export const Dialog: FunctionComponent<DialogProps> = ({
  children,
  className,
  modal,
  open,
  type,
  ...props
}) => {
  const rootRef = useRef<HTMLDialogElement>(null);

  const styles = useStyles({
    "theme-beos": stylesBeos,
    "theme-mac-os-classic": stylesMacOsClassic,
  });

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
    <dialog {...props} className={clsx(className, styles.root)} ref={rootRef}>
      <div className={styles.content}>
        <Icon className={styles.icon} />
        {children}
      </div>
    </dialog>
  );
};

Dialog.displayName = "Dialog";
