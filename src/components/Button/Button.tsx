import clsx from "clsx";
import {
  ButtonHTMLAttributes,
  DetailedHTMLProps,
  FunctionComponent,
  PropsWithChildren,
} from "react";

import styles from "./Button.module.css";

export type ButtonProps = PropsWithChildren<
  DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>
>;

export const Button: FunctionComponent<ButtonProps> = ({
  children,
  className,
  type = "button",
  ...props
}) => (
  // eslint-disable-next-line react/button-has-type
  <button {...props} className={clsx(className, styles.root)} type={type}>
    <span className={styles.content}>{children}</span>
  </button>
);

Button.displayName = "Button";
