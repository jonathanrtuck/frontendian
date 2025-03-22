import { SYSTEM_BAR_ID } from "@/ids";
import clsx from "clsx";
import { type FunctionComponent, type HTMLAttributes } from "react";

export const SystemBar: FunctionComponent<HTMLAttributes<HTMLElement>> = ({
  className,
  ...props
}) => (
  <header
    {...props}
    className={clsx("system-bar", className)}
    id={SYSTEM_BAR_ID}
    role="banner"
    tabIndex={-1}
  />
);
