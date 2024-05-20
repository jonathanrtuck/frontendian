import clsx from "clsx";
import {
  createContext,
  Dispatch,
  forwardRef,
  HTMLAttributes,
  ReactElement,
  SetStateAction,
  useContext,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";

import styles from "./Menubar.module.css";

// menuitem will be disabled if `items` is empty or not defined AND `onClick` is not defined
// submenuitem will be disabled if `onClick` is not defined
export type Menuitem =
  | {
      checked?: boolean;
      icon?: ReactElement;
      items?: {
        checked?: boolean;
        icon?: ReactElement;
        onClick?(): void;
        title: string;
        type?: "checkbox" | "radio";
      }[];
      onClick?(): void;
      title: string;
      type?: "checkbox" | "radio";
    }
  | Separator;

export type Menubaritem = {
  icon?: ReactElement;
  items: Menuitem[]; // menubaritem will be disabled if this is empty
  title: string;
};

export type Separator = null;

export const MenubarContext = createContext<
  Dispatch<SetStateAction<Menubaritem[]>>
>(() => []);

export const useMenubar = (menuitems: Menubaritem[]) => {
  const setMenuitems = useContext(MenubarContext);

  useEffect(() => {
    setMenuitems(menuitems);
  }, [menuitems, setMenuitems]);
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
      submenu?: string;
      submenuitem?: string;
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
  const [expandedMenuitemIndex, setExpandedMenuitemIndex] =
    useState<number>(-1);
  const [isKeyboardNavigation, setIsKeyboardNavigation] =
    useState<boolean>(false);

  const hasOpenMenu = expandedMenubaritemIndex !== -1;

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
          setExpandedMenuitemIndex(-1);
        }
      }}
      onClick={() => {
        setIsKeyboardNavigation(false);

        // reset focus
        (
          Array.from(
            rootRef.current?.querySelectorAll(
              `.${styles.menubaritem}:not([aria-disabled="true"])`
            ) ?? []
          ) as HTMLElement[]
        )[0]?.focus();
      }}
      onKeyDown={({ currentTarget, key }) => {
        setIsKeyboardNavigation(true);
      }}
      onMouseEnter={() => {
        setIsKeyboardNavigation(false);
      }}
      ref={rootRef}
      role="menubar">
      {items.map(({ icon, items, title }, i) => {
        const hasMenu = items.length !== 0;
        const isMenuExpanded = i === expandedMenubaritemIndex;
        const isFirstItem = i === 0;

        return (
          <li
            aria-disabled={!hasMenu}
            aria-expanded={isMenuExpanded}
            aria-haspopup="menu"
            aria-label={title}
            className={clsx(classes?.menubaritem, styles.menubaritem)}
            key={`${title}-${i}`}
            onClick={() => {
              if (hasMenu) {
                setExpandedMenubaritemIndex(isMenuExpanded ? -1 : i);
              }

              setExpandedMenuitemIndex(-1);
            }}
            onMouseEnter={() => {
              setExpandedMenubaritemIndex(hasMenu && hasOpenMenu ? i : -1);
              setExpandedMenuitemIndex(-1);
            }}
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
              hidden={!isMenuExpanded}>
              {items.map((item, j) => {
                if (item) {
                  const hasSubmenu =
                    Boolean(item.items) && item.items?.length !== 0;
                  const isCheckbox = item.type === "checkbox";
                  const isRadio = item.type === "radio";
                  const isSubmenuExpanded = j === expandedMenuitemIndex;

                  return (
                    <li
                      aria-checked={
                        isCheckbox || isRadio ? item.checked : undefined
                      }
                      aria-disabled={!item.onClick && !hasSubmenu}
                      aria-expanded={isSubmenuExpanded}
                      aria-label={item.title}
                      className={clsx(classes?.menuitem, styles.menuitem, {
                        [styles.hasSubmenu]: hasSubmenu,
                      })}
                      key={`${item.title}-${j}`}
                      onClick={item.onClick}
                      onMouseEnter={() => {
                        setExpandedMenuitemIndex(hasSubmenu ? j : -1);
                      }}
                      role={
                        (isCheckbox && "menuitemcheckbox") ||
                        (isRadio && "menuitemradio") ||
                        "menuitem"
                      }
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
                      {hasSubmenu && (
                        <menu
                          className={clsx(
                            classes?.menu,
                            classes?.submenu,
                            styles.menu,
                            styles.submenu
                          )}
                          hidden={!isSubmenuExpanded}>
                          {item.items?.map((subitem, k) => {
                            if (subitem) {
                              const isCheckbox = subitem.type === "checkbox";
                              const isRadio = subitem.type === "radio";

                              return (
                                <li
                                  aria-checked={
                                    isCheckbox || isRadio
                                      ? subitem.checked
                                      : undefined
                                  }
                                  aria-disabled={!subitem.onClick}
                                  aria-label={subitem.title}
                                  className={clsx(
                                    classes?.menuitem,
                                    styles.menuitem
                                  )}
                                  key={`${subitem.title}-${k}`}
                                  onClick={subitem.onClick}
                                  role={
                                    (isCheckbox && "menuitemcheckbox") ||
                                    (isRadio && "menuitemradio") ||
                                    "menuitem"
                                  }
                                  tabIndex={-1}>
                                  {subitem.icon && (
                                    <span
                                      aria-hidden
                                      className={clsx(
                                        classes?.icon,
                                        styles.icon
                                      )}
                                      role="presentation">
                                      {subitem.icon}
                                    </span>
                                  )}
                                  <label
                                    className={clsx(
                                      classes?.label,
                                      styles.label
                                    )}>
                                    {subitem.title}
                                  </label>
                                </li>
                              );
                            }

                            return (
                              <li
                                className={clsx(
                                  classes?.separator,
                                  styles.separator
                                )}
                                key={`separator-${k}`}
                                role="separator"
                              />
                            );
                          })}
                        </menu>
                      )}
                    </li>
                  );
                }

                return (
                  <li
                    className={clsx(classes?.separator, styles.separator)}
                    key={`separator-${j}`}
                    onMouseEnter={() => {
                      setExpandedMenuitemIndex(-1);
                    }}
                    role="separator"
                  />
                );
              })}
            </menu>
          </li>
        );
      })}
    </menu>
  );
});
