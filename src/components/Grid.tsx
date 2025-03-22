import clsx from "clsx";
import {
  type DetailedHTMLProps,
  type FunctionComponent,
  type HTMLAttributes,
} from "react";

export const Grid: FunctionComponent<
  DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>
> = ({ className, ...props }) => (
  <div {...props} className={clsx("grid", className)} />
);
