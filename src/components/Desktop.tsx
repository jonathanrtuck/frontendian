import clsx from "clsx";
import { type FunctionComponent, type HTMLAttributes } from "react";

export const Desktop: FunctionComponent<HTMLAttributes<HTMLElement>> = ({
  className,
  ...props
}) => <main {...props} className={clsx("desktop", className)} />;
