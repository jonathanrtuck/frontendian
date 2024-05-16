import clsx from "clsx";
import {
  forwardRef,
  HTMLAttributes,
  ReactElement,
  useImperativeHandle,
  useRef,
  useState,
} from "react";

import styles from "./Menubar.module.css";

export type Separator = null;

export type Menuitem =
  | {
      icon?: ReactElement;
      onClick?(): void; // menuitem will be disabled if this is not defined
      title: string;
    }
  | Separator;

export type Menubaritem = {
  icon?: ReactElement;
  items: Menuitem[]; // menubaritem will be disabled if this is empty
  title: string;
};

export const Menubar = forwardRef<
  HTMLElement,
  HTMLAttributes<HTMLMenuElement> & {
    classes?: {
      icon?: string;
      label?: string;
      menu?: string;
      menubaritem?: string;
      menuitem?: string;
      root?: string;
      separator?: string;
    };
    items: Menubaritem[];
    orientation?: "horizontal" | "vertical";
  }
>(({ classes, items, orientation = "horizontal", ...props }, ref) => {
  const rootRef = useRef<HTMLMenuElement>(null);

  useImperativeHandle<HTMLElement | null, HTMLElement | null>(
    ref,
    () => rootRef.current
  );

  const [expandedMenubaritemIndex, setExpandedMenubaritemIndex] =
    useState<number>(-1);
  const [isKeyboardNavigation, setIsKeyboardNavigation] =
    useState<boolean>(false);

  const hasOpenMenu = expandedMenubaritemIndex !== -1;

  const expandNextMenubaritem = () => {
    const menubaritems = getFocusableMenubaritems();
    const prevMenubaritem = getFocusedMenubaritem();

    if (menubaritems && prevMenubaritem) {
      const prevIndex = menubaritems.indexOf(prevMenubaritem);

      if (prevIndex !== -1) {
        const index = prevIndex === menubaritems.length - 1 ? 0 : prevIndex + 1;

        setExpandedMenubaritemIndex(index);
      }
    }
  };
  const expandPrevMenubaritem = () => {
    const menubaritems = getFocusableMenubaritems();
    const prevMenubaritem = getFocusedMenubaritem();

    if (menubaritems && prevMenubaritem) {
      const prevIndex = menubaritems.indexOf(prevMenubaritem);

      if (prevIndex !== -1) {
        const index = prevIndex === 0 ? menubaritems.length - 1 : prevIndex - 1;

        setExpandedMenubaritemIndex(index);
      }
    }
  };
  const focusNextMenubaritem = () => {
    const menubaritems = getFocusableMenubaritems();
    const prevMenubaritem = getFocusedMenubaritem();

    if (menubaritems && prevMenubaritem) {
      const prevIndex = menubaritems.indexOf(prevMenubaritem);

      if (prevIndex !== -1) {
        const index = prevIndex === menubaritems.length - 1 ? 0 : prevIndex + 1;

        menubaritems[index].focus();
      }
    }
  };
  const focusPrevMenubaritem = () => {
    const menubaritems = getFocusableMenubaritems();
    const prevMenubaritem = getFocusedMenubaritem();

    if (menubaritems && prevMenubaritem) {
      const prevIndex = menubaritems.indexOf(prevMenubaritem);

      if (prevIndex !== -1) {
        const index = prevIndex === 0 ? menubaritems.length - 1 : prevIndex - 1;

        menubaritems[index].focus();
      }
    }
  };
  const getFocusableMenubaritems = () =>
    Array.from(
      rootRef.current?.querySelectorAll(
        `.${styles.menubaritem}:not([aria-disabled="true"])`
      ) ?? []
    ) as HTMLElement[];
  const getFocusedMenubaritem = () =>
    rootRef.current?.querySelector(
      `.${styles.menubaritem}:focus`
    ) as HTMLElement;
  const resetFocus = () => {
    getFocusableMenubaritems()[0]?.focus();
  };

  return (
    <menu
      {...props}
      aria-orientation={orientation}
      className={clsx(props.className, classes?.root, styles.root, {
        [styles.keyboard]: isKeyboardNavigation,
        [styles.vertical]: orientation === "vertical",
      })}
      onBlur={({ relatedTarget }) => {
        if (rootRef.current && !rootRef.current.contains(relatedTarget)) {
          setExpandedMenubaritemIndex(-1);
        }
      }}
      onClick={() => {
        setIsKeyboardNavigation(false);
      }}
      onKeyDown={({ currentTarget, key }) => {
        console.debug("keydown…");
        setIsKeyboardNavigation(true);

        switch (key) {
        }
      }}
      onMouseEnter={() => {
        setIsKeyboardNavigation(false);
      }}
      ref={rootRef}
      role="menubar">
      {items.map(({ icon, items, title }, i) => {
        const isDisabled = items.length === 0;
        const isExpanded = i === expandedMenubaritemIndex;
        const isFirstItem = i === 0;

        return (
          <li
            aria-disabled={isDisabled}
            aria-expanded={isExpanded}
            aria-haspopup="menu"
            aria-label={title}
            className={clsx(classes?.menubaritem, styles.menubaritem)}
            key={title}
            onClick={
              isDisabled
                ? undefined
                : () => {
                    setExpandedMenubaritemIndex(isExpanded ? -1 : i);
                  }
            }
            onKeyDown={
              isDisabled
                ? undefined
                : ({ key }) => {
                    switch (key) {
                      case "ArrowDown":
                        if (orientation === "vertical") {
                          focusNextMenubaritem();
                        } else {
                          setExpandedMenubaritemIndex(isExpanded ? -1 : i);
                          // focus first menuitem
                        }
                        break;
                      case "ArrowLeft":
                        if (orientation === "horizontal") {
                          if (isExpanded) {
                            expandPrevMenubaritem();
                          }

                          focusPrevMenubaritem();
                        }
                        break;
                      case "ArrowRight":
                        if (orientation === "horizontal") {
                          if (isExpanded) {
                            expandNextMenubaritem();
                          }

                          focusNextMenubaritem();
                        } else {
                          setExpandedMenubaritemIndex(isExpanded ? -1 : i);
                        }
                        break;
                      case "ArrowUp":
                        if (orientation === "vertical") {
                          focusPrevMenubaritem();
                        }
                        break;
                      case "Enter":
                      case " ":
                        setExpandedMenubaritemIndex(isExpanded ? -1 : i);
                        break;
                      case "Escape":
                        break;
                    }
                  }
            }
            onMouseEnter={
              isDisabled
                ? undefined
                : () => {
                    if (hasOpenMenu) {
                      setExpandedMenubaritemIndex(i);
                    }
                  }
            }
            role="menuitem"
            tabIndex={isFirstItem ? 0 : -1}>
            {icon && (
              <span
                aria-hidden
                className={clsx(classes?.icon, styles.icon)}
                role="presentation">
                {icon}
              </span>
            )}
            <label className={clsx(classes?.label, styles.label)}>
              {title}
            </label>
            <menu
              className={clsx(classes?.menu, styles.menu)}
              hidden={!isExpanded}>
              {items.map((item, i) =>
                item ? (
                  <li
                    aria-disabled={!item.onClick}
                    aria-label={item.title}
                    className={clsx(classes?.menuitem, styles.menuitem)}
                    key={item.title}
                    onClick={() => {
                      resetFocus();
                      item.onClick?.();
                    }}
                    onKeyDown={({ key }) => {
                      switch (key) {
                        case "Enter":
                        case " ":
                          resetFocus();
                          item.onClick?.();
                          break;
                      }
                    }}
                    role="menuitem"
                    tabIndex={-1}>
                    {item.icon && (
                      <span
                        aria-hidden
                        className={clsx(classes?.icon, styles.icon)}
                        role="presentation">
                        {item.icon}
                      </span>
                    )}
                    <label className={clsx(classes?.label, styles.label)}>
                      {item.title}
                    </label>
                  </li>
                ) : (
                  <li
                    className={clsx(classes?.separator, styles.separator)}
                    key={`separator-${i}`}
                    role="separator"
                  />
                )
              )}
            </menu>
          </li>
        );
      })}
    </menu>
  );
});
