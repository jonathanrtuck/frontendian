"use client";

import "./Button.theme-beos.css";
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
> = ({ className, type = "button", ...props }) => (
  <button
    {...props}
    className={clsx(className, "component-button")}
    type={type} // eslint-disable-line react/button-has-type
  />
);

Button.displayName = "Button";
