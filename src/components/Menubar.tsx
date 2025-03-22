import clsx from "clsx";
import { type FunctionComponent, type MenuHTMLAttributes } from "react";

export const Menubar: FunctionComponent<MenuHTMLAttributes<HTMLElement>> = ({
  children,
  className,
  role = "menubar",
  ...props
}) => (
  <menu
    {...props}
    aria-orientation={props["aria-orientation"] ?? "horizontal"}
    className={clsx("menubar", className)}
    role={role}>
    {children}
  </menu>
);
