import clsx from "clsx";
import { ButtonHTMLAttributes, FunctionComponent } from "react";

import styles from "./Button.module.css";

export const Button: FunctionComponent<
  ButtonHTMLAttributes<HTMLButtonElement>
> = ({ children, className, type = "button", ...props }) => (
  <button className={clsx(className, styles.root)} type={type} {...props}>
    {children}
  </button>
);
