import clsx from "clsx";
import {
  type ElementType,
  type FunctionComponent,
  type HTMLAttributes,
  createElement,
} from "react";

export const Separator: FunctionComponent<
  HTMLAttributes<HTMLElement> & { component?: ElementType }
> = ({ className, component, ...props }) =>
  createElement(component ?? "li", {
    ...props,
    className: clsx("separator", className),
    role: "separator",
  });
