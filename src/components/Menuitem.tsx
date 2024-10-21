import clsx from "clsx";
import {
  FunctionComponent,
  HTMLAttributes,
  ReactElement,
  useCallback,
  useContext,
  useId,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import { MenuContext, MenuitemContext, MenuitemContextType } from "@/contexts";
import { useStore, useStyles } from "@/hooks";
import { ComponentName, IconComponent } from "@/types";
import { removeProps } from "@/utils";

const COMPONENT_NAME: ComponentName = "Menuitem";

export type MenuitemProps = Omit<
  HTMLAttributes<HTMLLIElement>,
  "onClick" | "role"
> & {
  classes?: {
    button?: string;
    icon?: string;
    separator?: string;
    title?: string;
  };
} & (
    | ({
        title: string;
      } & (
        | {
            children: ReactElement;
          }
        | ({
            Icon?: IconComponent;
            disabled?: boolean;
            onClick?(): void;
          } & (
            | {
                checked?: boolean;
                type: "checkbox" | "radio";
              }
            | {}
          ))
      ))
    | {
        separator: true;
      }
  );

export const Menuitem: FunctionComponent<MenuitemProps> = ({
  children,
  className,
  classes,
  ...props
}) => {
  const theme = useStore((state) => state.theme);
  const styles = useStyles(COMPONENT_NAME);

  const {
    hasPopup,
    inactivate,
    isActive,
    isFocusWithin,
    isPointer,
    isTop,
    orientation,
  } = useContext(MenuContext);
  const { collapse: parentCollapse, topButtonRef: parentTopButtonRef } =
    useContext(MenuitemContext);

  const id = useId();

  const rootRef = useRef<HTMLLIElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const [tabIndex, setTabIndex] = useState<-1 | 0>(-1);

  const collapse = useCallback(() => {
    setIsExpanded(false);
    rootRef.current?.focus();
  }, []);

  const topButtonRef = isTop ? buttonRef : parentTopButtonRef;

  const contextValue = useMemo<MenuitemContextType>(
    () => ({
      collapse,
      isExpanded,
      topButtonRef,
    }),
    [collapse, isExpanded, topButtonRef]
  );

  useLayoutEffect(() => {
    if (!isActive) {
      setIsExpanded(false);
    }
  }, [isActive]);

  useLayoutEffect(() => {
    if (isTop) {
      setTabIndex((prevState) => {
        const isFirstMenuitem = rootRef.current?.matches(":first-of-type");
        const hasFocus = rootRef.current?.matches(":focus-within");

        if (isFocusWithin && isFirstMenuitem && !hasFocus) {
          return -1;
        }

        if (!isFocusWithin) {
          return isFirstMenuitem ? 0 : -1;
        }

        return prevState;
      });
    }
  }, [isFocusWithin, isTop]);

  if ("separator" in props) {
    return (
      <li
        {...removeProps<HTMLAttributes<HTMLLIElement>>(props, ["separator"])}
        className={clsx(
          className,
          classes?.separator,
          styles.root,
          styles.separator
        )}
        onClick={() => {
          topButtonRef.current?.focus();

          inactivate();
        }}
        onMouseEnter={(e) => {
          props.onMouseEnter?.(e);

          if (isActive) {
            e.currentTarget.focus();
          }
        }}
        role="separator"
        tabIndex={-1}
      />
    );
  }

  const Icon = ("Icon" in props && props.Icon) || undefined;
  const checked = ("checked" in props && props.checked) ?? false;
  const disabled = ("disabled" in props && props.disabled) ?? false;
  const onClick = "onClick" in props ? props.onClick : undefined;
  const title = "title" in props ? props.title : undefined;
  const type = "type" in props ? props.type : undefined;

  const haspopup = Boolean(children);

  const getChildMenuitemButtons = (): HTMLElement[] =>
    Array.from(
      rootRef.current?.querySelectorAll(
        `:scope > [role="menu"] > .${styles.root} > .${styles.button}`
      ) ?? []
    );
  const onActivate = (): void => {
    if (!checked && !disabled) {
      onClick?.();
    }

    if (haspopup && !isExpanded) {
      setTabIndex(0);
      setIsExpanded(true);
      getChildMenuitemButtons().at(0)?.focus();
    } else {
      topButtonRef.current?.focus();
      inactivate();
    }
  };

  return (
    <li
      {...removeProps<HTMLAttributes<HTMLLIElement>>(props, [
        "checked",
        "disabled",
        "Icon",
        "onBlur",
        "onClick",
        "onFocus",
        "role",
        "title",
      ])}
      className={clsx(className, styles.root, styles[orientation], {
        [styles.top]: isTop,
      })}
      onBlur={(e) => {
        props.onBlur?.(e);

        if (
          haspopup &&
          document.hasFocus() &&
          !e.currentTarget?.contains(e.relatedTarget)
        ) {
          setIsExpanded(false);

          if (isTop) {
            setTabIndex(-1);
          }
        }
      }}
      ref={rootRef}
      role="none">
      <button
        aria-checked={type ? checked : undefined}
        aria-disabled={disabled}
        aria-expanded={haspopup ? isExpanded : undefined}
        aria-haspopup={haspopup ? "menu" : undefined}
        aria-labelledby={`${id}-title`}
        className={clsx(classes?.button, styles.button, {
          [styles.hasPopup]: hasPopup,
          [styles.pointer]: isPointer,
        })}
        onClick={onActivate}
        onKeyDown={(e) => {
          const parentMenuitem =
            rootRef.current?.parentElement?.closest<HTMLElement>(
              `.${styles.root}`
            );
          const parentMenuitemButton =
            parentMenuitem?.querySelector<HTMLElement>(`.${styles.button}`);
          const childMenuitemButtons = getChildMenuitemButtons();
          const siblingMenuitemButtons = Array.from<HTMLElement>(
            rootRef.current?.parentElement?.querySelectorAll(
              `:scope > .${styles.root} > .${styles.button}`
            ) ?? []
          );
          const index = siblingMenuitemButtons.indexOf(e.currentTarget);
          const isFirstMenuitem = index === 0;
          const isLastMenuitem = index === siblingMenuitemButtons.length - 1;

          switch (e.key) {
            case "ArrowDown":
              if (isTop && orientation === "horizontal") {
                setIsExpanded(true);
                childMenuitemButtons.at(0)?.focus();
              } else {
                siblingMenuitemButtons
                  .at(isLastMenuitem ? 0 : index + 1)
                  ?.focus();
              }
              break;
            case "ArrowLeft":
              if (isTop) {
                if (orientation === "horizontal") {
                  siblingMenuitemButtons.at(index - 1)?.focus();
                }
              } else {
                parentCollapse();

                if (
                  parentMenuitemButton &&
                  parentMenuitem?.matches(`.${styles.horizontal}`)
                ) {
                  const parentMenuitemButtons = Array.from<HTMLElement>(
                    parentMenuitem?.parentElement?.querySelectorAll(
                      `:scope > .${styles.root} > .${styles.button}`
                    ) ?? []
                  );
                  const parentIndex =
                    parentMenuitemButtons.indexOf(parentMenuitemButton);
                  const prevMenuitemButton = parentMenuitemButtons.at(
                    parentIndex - 1
                  );

                  prevMenuitemButton?.focus();
                } else {
                  parentMenuitemButton?.focus();
                }
              }
              break;
            case "ArrowRight":
              if (isTop) {
                if (orientation === "horizontal") {
                  siblingMenuitemButtons
                    .at(isLastMenuitem ? 0 : index + 1)
                    ?.focus();
                } else if (haspopup) {
                  setIsExpanded(true);
                  childMenuitemButtons.at(0)?.focus();
                }
              } else {
                if (haspopup) {
                  setIsExpanded(true);
                  childMenuitemButtons.at(0)?.focus();
                } else {
                  const topMenuitemButton = topButtonRef.current;
                  const topMenuitem = topMenuitemButton?.closest(
                    `.${styles.root}`
                  );

                  if (
                    topMenuitemButton &&
                    topMenuitem?.matches(`.${styles.horizontal}`)
                  ) {
                    const topMenuitemButtons = Array.from<HTMLElement>(
                      topMenuitem?.parentElement?.querySelectorAll(
                        `:scope > .${styles.root} > .${styles.button}`
                      ) ?? []
                    );
                    const topIndex =
                      topMenuitemButtons.indexOf(topMenuitemButton);
                    const nextMenuitemButton = topMenuitemButtons.at(
                      topIndex === topMenuitemButtons.length - 1
                        ? 0
                        : topIndex + 1
                    );

                    nextMenuitemButton?.focus();
                  } else {
                    parentMenuitemButton?.focus();
                  }
                }
              }
              break;
            case "ArrowUp":
              if (isTop && orientation === "horizontal") {
                setIsExpanded(true);
                childMenuitemButtons.at(-1)?.focus();
              } else {
                siblingMenuitemButtons
                  .at(isFirstMenuitem ? -1 : index - 1)
                  ?.focus();
              }
              break;
            case "Enter":
            case " ":
              e.preventDefault();
              onActivate();
              break;
            case "Escape":
              e.preventDefault();
              parentCollapse();
              parentMenuitemButton?.focus();
              break;
          }
        }}
        onMouseEnter={(e) => {
          if (document.hasFocus() && isActive) {
            if (isTop) {
              setTabIndex(0);
            } else if (haspopup) {
              setIsExpanded(true);
              getChildMenuitemButtons().at(0)?.focus();
            } else {
              e.currentTarget.focus();
            }
          }
        }}
        onPointerDown={(e) => {
          if (haspopup && isExpanded) {
            e.preventDefault();
          }
        }}
        ref={buttonRef}
        role={
          (type === "checkbox" && "menuitemcheckbox") ||
          (type === "radio" && "menuitemradio") ||
          "menuitem"
        }
        tabIndex={tabIndex}
        type="button">
        {!!Icon && (
          <Icon
            aria-hidden
            className={clsx(classes?.icon, styles.icon)}
            theme={theme}
          />
        )}
        <span className={clsx(classes?.title, styles.title)} id={`${id}-title`}>
          {title}
        </span>
      </button>
      <MenuitemContext.Provider value={contextValue}>
        {children}
      </MenuitemContext.Provider>
    </li>
  );
};

Menuitem.displayName = COMPONENT_NAME;
