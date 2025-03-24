import { type IconComponent } from "@/types";
import clsx from "clsx";
import { type ButtonHTMLAttributes, type FunctionComponent } from "react";

// @see https://www.w3.org/WAI/ARIA/apg/patterns/menu-button/
// @todo ^^^
export const MenuButton: FunctionComponent<
  ButtonHTMLAttributes<HTMLButtonElement> & {
    classes?: Partial<{
      icon: string;
      root: string;
      text: string;
    }>;
    Icon?: IconComponent;
  } & ({ title: string } | { "aria-label": string })
> = ({
  children,
  classes = {},
  className,
  Icon,
  title,
  type = "button",
  ...props
}) => (
  <>
    <button
      {...props}
      aria-haspopup
      aria-label={props["aria-label"] ?? title}
      className={clsx("menu-button", className, classes.root)}
      title={title}
      // eslint-disable-next-line react/button-has-type
      type={type}>
      {Icon ? (
        <Icon className={clsx("menu-button-icon", classes.icon)} />
      ) : null}
      {title ? (
        <span aria-hidden className={clsx("menu-button-text", classes.text)}>
          {title}
        </span>
      ) : null}
    </button>
    {children}
  </>
);
