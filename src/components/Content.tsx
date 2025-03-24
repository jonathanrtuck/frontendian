import clsx from "clsx";
import { type FunctionComponent, type HTMLAttributes } from "react";

export const Content: FunctionComponent<
  HTMLAttributes<HTMLElement> & { scrollable?: boolean }
> = ({ className, scrollable, ...props }) => {
  return <div {...props} className={clsx("content", className)} />;
};
