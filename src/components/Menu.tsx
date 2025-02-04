import clsx from "clsx";
import {
  Children,
  ContextType,
  FocusEvent,
  forwardRef,
  HTMLAttributes,
  isValidElement,
  KeyboardEvent,
  PointerEvent,
  PropsWithChildren,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";

import { MenuContext, MenuitemContext } from "@/contexts";
import { useStyles } from "@/hooks";

// @see https://www.w3.org/WAI/ARIA/apg/patterns/menubar/
export const Menu = forwardRef<
  HTMLMenuElement,
  PropsWithChildren<
    {
      horizontal?: boolean;
      vertical?: boolean;
      bar?: boolean;
    } & Omit<
      HTMLAttributes<HTMLMenuElement>,
      "aria-hidden" | "aria-orientation" | "role"
    >
  >
>(
  (
    {
      bar,
      children,
      className,
      horizontal,
      onBlur,
      onFocus,
      onKeyDown,
      onPointerDown,
      vertical,
      ...props
    },
    ref
  ) => {
    const styles = useStyles("Menu");

    const {
      inactivate: parentInactivate,
      isActive: isParentActive,
      isPointer: isParentPointer,
    } = useContext(MenuContext);
    const { isExpanded } = useContext(MenuitemContext);

    const [isActive, setIsActive] = useState<boolean>(false);
    const [isFocusWithin, setIsFocusWithin] = useState<boolean>(false);
    const [isPointer, setIsPointer] = useState<boolean>(false);

    const inactivate = useCallback(() => {
      setIsActive(false);
    }, []);

    // if has grandchildren (Menu -> Menuitem -> Menu)
    const hasPopup = useMemo<boolean>(
      () =>
        Children.toArray(children)
          .filter(isValidElement)
          .some(({ props }) =>
            Children.toArray((props as any).children)
              .filter(isValidElement)
              .some(
                ({ props }) => Children.count((props as any).children) !== 0
              )
          ),
      [children]
    );
    const contextValue = useMemo<ContextType<typeof MenuContext>>(
      () => ({
        hasPopup,
        inactivate: bar ? inactivate : parentInactivate,
        isActive: bar ? isActive : isParentActive,
        isFocusWithin,
        isPointer: bar ? isPointer : isParentPointer,
        isTop: Boolean(bar),
        orientation: bar && horizontal ? "horizontal" : "vertical",
      }),
      [
        bar,
        hasPopup,
        horizontal,
        inactivate,
        isActive,
        isFocusWithin,
        isParentActive,
        isParentPointer,
        isPointer,
        parentInactivate,
      ]
    );

    return (
      <menu
        {...props}
        aria-hidden={bar ? undefined : !isExpanded}
        aria-orientation={
          bar ? (horizontal ? "horizontal" : "vertical") : undefined
        }
        className={clsx(className, styles.root, {
          "visually-hidden": !bar && !isExpanded,
          [styles.bar]: bar,
          [styles.horizontal]: horizontal,
          [styles.vertical]: !horizontal,
        })}
        onBlur={(e: FocusEvent<HTMLMenuElement>) => {
          onBlur?.(e);

          if (
            document.hasFocus() &&
            !e.currentTarget?.contains(e.relatedTarget)
          ) {
            setIsActive(false);
            setIsFocusWithin(false);
            setIsPointer(false);
          }
        }}
        onFocus={(e: FocusEvent<HTMLMenuElement>) => {
          onFocus?.(e);

          setIsActive(true);
          setIsFocusWithin(true);
        }}
        onKeyDown={(e: KeyboardEvent<HTMLMenuElement>) => {
          onKeyDown?.(e);

          if (bar) {
            setIsPointer(false);
          }
        }}
        onPointerDown={(e: PointerEvent<HTMLMenuElement>) => {
          onPointerDown?.(e);

          if (bar) {
            setIsPointer(true);
          }
        }}
        ref={ref}
        role={bar ? "menubar" : "menu"}>
        <MenuContext.Provider value={contextValue}>
          {children}
        </MenuContext.Provider>
      </menu>
    );
  }
);

Menu.displayName = "Menu";
