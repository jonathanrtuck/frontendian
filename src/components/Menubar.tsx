import clsx from "clsx";
import { type FunctionComponent, type MenuHTMLAttributes } from "react";

// @see https://www.w3.org/WAI/ARIA/apg/patterns/menubar/
// @todo ^^^
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
