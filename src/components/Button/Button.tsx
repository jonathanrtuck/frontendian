import clsx from "clsx";
import { ButtonHTMLAttributes, FunctionComponent } from "react";

import styles from "./Button.module.css";

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

export const Button: FunctionComponent<ButtonProps> = ({
  children,
  className,
  type = "button",
  ...props
}) => (
  <button className={clsx(className, styles.root)} type={type} {...props}>
    {children}
  </button>
);
