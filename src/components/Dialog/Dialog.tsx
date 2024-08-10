import clsx from "clsx";
import { FunctionComponent, HTMLAttributes, PropsWithChildren } from "react";

import styles from "./Dialog.module.css";

export type DialogProps = PropsWithChildren<
  Omit<HTMLAttributes<HTMLDialogElement>, "open">
>;

export const Dialog: FunctionComponent<DialogProps> = ({
  children,
  className,
  ...props
}) => (
  <dialog {...props} className={clsx(className, styles.root)} open>
    {children}
  </dialog>
);

Dialog.displayName = "Dialog";
