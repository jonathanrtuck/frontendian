"use client";

import clsx from "clsx";
import {
  type FunctionComponent,
  type MenuHTMLAttributes,
  useId,
  useLayoutEffect,
  useRef,
} from "react";

export const Menu: FunctionComponent<MenuHTMLAttributes<HTMLElement>> = ({
  children,
  className,
  popover = "auto",
  ...props
}) => {
  const uniqueId = useId();
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const id = props.id ?? uniqueId;

  useLayoutEffect(
    () => menuButtonRef.current?.setAttribute("popovertarget", id),
    [id]
  );

  return (
    <menu
      {...props}
      className={clsx("menu", className)}
      id={id}
      onClick={(e) => {
        let parentElement: HTMLElement | null = e.currentTarget;
        while (parentElement) {
          if (parentElement.popover) {
            parentElement.hidePopover();
          }
          parentElement = parentElement.parentElement;
        }
        props.onClick?.(e);
      }}
      onToggle={({ newState }) =>
        menuButtonRef.current?.setAttribute(
          "aria-expanded",
          String(newState === "open")
        )
      }
      popover={popover}
      ref={(node) => {
        menuButtonRef.current =
          node?.previousElementSibling as HTMLButtonElement;
      }}>
      {children}
    </menu>
  );
};
