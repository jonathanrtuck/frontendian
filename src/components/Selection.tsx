import clsx from "clsx";
import { type FunctionComponent, type HTMLAttributes } from "react";

export const Selection: FunctionComponent<HTMLAttributes<HTMLElement>> = (
  props
) => (
  <mark
    {...props}
    aria-hidden
    className={clsx("selection", props.className)}
    role="presentation"
  />
);
