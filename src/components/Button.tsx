import clsx from "clsx";
import {
  type ButtonHTMLAttributes,
  type DetailedHTMLProps,
  type FunctionComponent,
  type PropsWithChildren,
} from "react";

export const Button: FunctionComponent<
  PropsWithChildren<
    DetailedHTMLProps<
      ButtonHTMLAttributes<HTMLButtonElement>,
      HTMLButtonElement
    >
  >
> = ({ className, type = "button", ...props }) => (
  <button
    {...props}
    className={clsx("button", className)}
    type={type} // eslint-disable-line react/button-has-type
  />
);
