import clsx from "clsx";
import {
  DetailedHTMLProps,
  DialogHTMLAttributes,
  FunctionComponent,
  PropsWithChildren,
  useLayoutEffect,
  useRef,
} from "react";

import { useStore, useStyles } from "@/hooks";
import { AlertError, AlertInfo } from "@/icons";
import { ComponentName, IconComponent } from "@/types";

const COMPONENT_NAME: ComponentName = "Dialog";

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
  const theme = useStore((state) => state.theme);
  const styles = useStyles(COMPONENT_NAME);

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
    <dialog {...props} className={clsx(className, styles.root)} ref={rootRef}>
      <div className={styles.content}>
        <Icon className={styles.icon} theme={theme} />
        {children}
      </div>
    </dialog>
  );
};

Dialog.displayName = COMPONENT_NAME;
