import clsx from "clsx";
import { FunctionComponent, HTMLAttributes, PropsWithChildren } from "react";

export type DialogProps = PropsWithChildren<
  Omit<HTMLAttributes<HTMLDialogElement>, "open">
>;

export const Dialog: FunctionComponent<DialogProps> = ({
  children,
  className,
  ...props
}) => (
  <dialog {...props} className={clsx(className, "dialog")} open>
    {children}
  </dialog>
);

Dialog.displayName = "Dialog";
