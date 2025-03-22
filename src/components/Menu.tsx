"use client";

import clsx from "clsx";
import {
  type FunctionComponent,
  type MenuHTMLAttributes,
  useCallback,
  useId,
  useLayoutEffect,
  useRef,
} from "react";

// @see https://www.w3.org/WAI/ARIA/apg/patterns/menubar/
// @todo ^^^
export const Menu: FunctionComponent<MenuHTMLAttributes<HTMLElement>> = ({
  children,
  className,
  popover = "auto",
  ...props
}) => {
  const uniqueId = useId();
  const rootRef = useRef<HTMLElement>(null);
  const id = props.id ?? uniqueId;
  const close = useCallback(() => {
    let element: HTMLElement | null = rootRef.current;
    while (element) {
      if (element.popover) {
        element.hidePopover();
      }
      element = element.parentElement;
    }
  }, []);

  useLayoutEffect(
    () =>
      rootRef.current?.previousElementSibling?.setAttribute(
        "popovertarget",
        id
      ),
    [id]
  );

  return (
    <menu
      {...props}
      className={clsx("menu", className)}
      id={id}
      onClick={(e) => {
        close();
        props.onClick?.(e);
      }}
      onPointerUp={close}
      onToggle={({ newState }) =>
        rootRef.current?.previousElementSibling?.setAttribute(
          "aria-expanded",
          String(newState === "open")
        )
      }
      popover={popover}
      ref={rootRef}>
      {children}
    </menu>
  );
};
