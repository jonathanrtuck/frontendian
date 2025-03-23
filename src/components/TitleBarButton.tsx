import clsx from "clsx";
import { type ButtonHTMLAttributes, type FunctionComponent } from "react";

export const TitleBarButton: FunctionComponent<
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, "title"> & { title: string }
> = ({ className, title, type = "button", ...props }) => (
  <button
    {...props}
    aria-label={props["aria-label"] ?? title}
    className={clsx("title-bar-button", className)}
    title={title}
    // eslint-disable-next-line react/button-has-type
    type={type}
  />
);
