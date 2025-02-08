"use client";

import { useStore } from "@/store";
import clsx from "clsx";
import type {
  ButtonHTMLAttributes,
  DetailedHTMLProps,
  FunctionComponent,
  PropsWithChildren,
} from "react";
import * as styles from "./Button.css";

export const Button: FunctionComponent<
  PropsWithChildren<
    DetailedHTMLProps<
      ButtonHTMLAttributes<HTMLButtonElement>,
      HTMLButtonElement
    >
  >
> = ({ children, className, type = "button", ...props }) => {
  const currentThemeId = useStore((store) => store.currentThemeId);

  return (
    <button
      {...props}
      className={clsx(className, styles.root[currentThemeId])}
      type={type} // eslint-disable-line react/button-has-type
    >
      <span className={styles.content[currentThemeId]}>{children}</span>
    </button>
  );
};

Button.displayName = "Button";
