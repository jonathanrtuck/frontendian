"use client";

import clsx from "clsx";
import type {
  ButtonHTMLAttributes,
  DetailedHTMLProps,
  FunctionComponent,
  PropsWithChildren,
} from "react";

export const Button: FunctionComponent<
  PropsWithChildren<
    DetailedHTMLProps<
      ButtonHTMLAttributes<HTMLButtonElement>,
      HTMLButtonElement
    >
  >
> = ({ children, className, type = "button", ...props }) => (
  <button
    {...props}
    className={clsx(className)}
    type={type} // eslint-disable-line react/button-has-type
  >
    <span>{children}</span>
  </button>
);

Button.displayName = "Button";
