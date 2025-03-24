import clsx from "clsx";
import type { FunctionComponent, HTMLAttributes } from "react";

export const Tray: FunctionComponent<HTMLAttributes<HTMLElement>> = ({
  children,
  className,
  ...props
}) => (
  <aside {...props} className={clsx("tray", className)}>
    {children}
  </aside>
);
