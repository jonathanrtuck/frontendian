import type { IconComponent } from "@/types";
import clsx from "clsx";
import {
  type ButtonHTMLAttributes,
  Children,
  type ElementType,
  type FunctionComponent,
  type HTMLAttributes,
  createElement,
} from "react";
import type { EmptyObject, RequireAtLeastOne } from "type-fest";

export const Menuitem: FunctionComponent<
  RequireAtLeastOne<
    ButtonHTMLAttributes<HTMLButtonElement> | HTMLAttributes<HTMLElement>,
    "aria-label" | "title"
  > & {
    classes?: Partial<{
      button: string;
      caret: string;
      icon: string;
      root: string;
      text: string;
    }>;
    component?: ElementType;
    Icon?: IconComponent;
  } & (
      | {
          checked?: boolean;
          type: "checkbox" | "radio";
        }
      | EmptyObject
    )
> = ({
  children,
  classes = {},
  className,
  component,
  Icon,
  role = "menuitem",
  title,
  ...props
}) => {
  const hasPopup = Children.count(children) !== 0;
  const elementType: ElementType =
    (component ?? "href" in props) ? "a" : "button";
  const button = createElement(
    elementType,
    {
      ...props,
      "aria-haspopup": hasPopup,
      "aria-label": props["aria-label"] ?? title,
      className: clsx("menuitem-button", classes.button),
      role,
      title,
      type:
        elementType === "button" && "type" in props
          ? (props.type ?? "button")
          : undefined,
    },
    <>
      {Icon ? (
        <Icon aria-hidden className={clsx("menuitem-icon", classes.icon)} />
      ) : null}
      {title ? (
        <span aria-hidden className={clsx("menuitem-text", classes.text)}>
          {title}
        </span>
      ) : null}
      {hasPopup ? (
        <span aria-hidden className={clsx("menuitem-caret", classes.caret)} />
      ) : null}
    </>,
  );

  return (
    <li className={clsx("menuitem", className, classes.root)}>
      {button}
      {children}
    </li>
  );
};
