import clsx from "clsx";
import { type FunctionComponent, type HTMLAttributes } from "react";

export const Desktop: FunctionComponent<HTMLAttributes<HTMLElement>> = ({
  children,
  ...props
}) => (
  <main {...props} className={clsx("desktop", props.className)}>
    {children}
  </main>
);
