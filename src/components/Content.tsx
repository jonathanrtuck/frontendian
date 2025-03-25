import clsx from "clsx";
import type { FunctionComponent, HTMLAttributes } from "react";

export const Content: FunctionComponent<
  HTMLAttributes<HTMLElement> & { scrollable?: boolean }
> = ({ children, className, scrollable, ...props }) => (
  <div {...props} className={clsx("content", className)}>
    {children}
  </div>
);
