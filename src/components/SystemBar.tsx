import clsx from "clsx";
import { type FunctionComponent, type HTMLAttributes } from "react";

export const SystemBar: FunctionComponent<HTMLAttributes<HTMLElement>> = (
  props
) => (
  <header
    {...props}
    className={clsx("system-bar", props.className)}
    role="banner"
    tabIndex={-1}
  />
);
