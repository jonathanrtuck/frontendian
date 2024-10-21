import clsx from "clsx";
import {
  ButtonHTMLAttributes,
  DetailedHTMLProps,
  FunctionComponent,
  PropsWithChildren,
} from "react";

import { useStyles } from "@/hooks";
import { ComponentName } from "@/types";

const COMPONENT_NAME: ComponentName = "Button";

export const Button: FunctionComponent<
  PropsWithChildren<
    DetailedHTMLProps<
      ButtonHTMLAttributes<HTMLButtonElement>,
      HTMLButtonElement
    >
  >
> = ({ children, className, type = "button", ...props }) => {
  const styles = useStyles(COMPONENT_NAME);

  return (
    // eslint-disable-next-line react/button-has-type
    <button {...props} className={clsx(className, styles.root)} type={type}>
      <span className={styles.content}>{children}</span>
    </button>
  );
};

Button.displayName = COMPONENT_NAME;
