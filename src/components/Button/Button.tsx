import clsx from "clsx";
import {
  ButtonHTMLAttributes,
  DetailedHTMLProps,
  FunctionComponent,
  PropsWithChildren,
} from "react";

import { useStyles } from "@/hooks";

import stylesBeos from "./Button.beos.module.css";
import stylesMacOsClassic from "./Button.mac-os-classic.module.css";

export type ButtonProps = PropsWithChildren<
  DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>
>;

export const Button: FunctionComponent<ButtonProps> = ({
  children,
  className,
  type = "button",
  ...props
}) => {
  const styles = useStyles({
    "theme-beos": stylesBeos,
    "theme-mac-os-classic": stylesMacOsClassic,
  });

  return (
    // eslint-disable-next-line react/button-has-type
    <button {...props} className={clsx(className, styles.root)} type={type}>
      <span className={styles.content}>{children}</span>
    </button>
  );
};

Button.displayName = "Button";
