"use client";

import { MenuContext, MenuitemContext } from "@/contexts";
import { useStore } from "@/store";
import { IconComponent } from "@/types";
import clsx from "clsx";
import type {
  ContextType,
  FunctionComponent,
  HTMLAttributes,
  ReactNode,
} from "react";
import {
  useCallback,
  useContext,
  useId,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import type { RequireAllOrNone } from "type-fest";
import * as styles from "./Menuitem.css";

type HTMLElementAttributes = HTMLAttributes<HTMLLIElement>;

const removeProps = (
  props: HTMLElementAttributes,
  propNames: string[]
): HTMLElementAttributes =>
  Object.entries(props).reduce<HTMLElementAttributes>((acc, [key, value]) => {
    if (!propNames.includes(key)) {
      acc[key as keyof HTMLElementAttributes] = value;
    }

    return acc;
  }, {} as HTMLElementAttributes);

export const Menuitem: FunctionComponent<
  Omit<
    HTMLElementAttributes,
    "checked" | "disabled" | "onClick" | "role" | "title" | "type"
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
              children: ReactNode;
            }
          | RequireAllOrNone<
              {
                checked?: boolean;
                Icon?: IconComponent;
                disabled?: boolean;
                onClick?(): void;
                type: "checkbox" | "radio";
              },
              "checked" | "type"
            >
        ))
      | {
          separator: true;
        }
    )
> = ({ children, className, classes, ...props }) => {
  const currentThemeId = useStore((store) => store.currentThemeId);
  const themes = useStore((store) => store.themes);
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
  const theme = themes.find(({ id }) => id === currentThemeId)!;
  const collapse = useCallback(() => {
    setIsExpanded(false);
    rootRef.current?.focus();
  }, []);
  const topButtonRef = isTop ? buttonRef : parentTopButtonRef;
  const contextValue = useMemo<ContextType<typeof MenuitemContext>>(
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
        {...removeProps(props, ["separator"])}
        className={clsx(
          className,
          classes?.separator,
          styles.root[currentThemeId],
          styles.separator[currentThemeId]
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
        `:scope > [role="menu"] > .${styles.root[currentThemeId]} > .${styles.button[currentThemeId]}`
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
      {...removeProps(props, [
        "checked",
        "disabled",
        "Icon",
        "onBlur",
        "onClick",
        "onFocus",
        "role",
        "title",
      ])}
      className={clsx(
        className,
        styles.root[currentThemeId],
        styles[orientation][currentThemeId],
        {
          [styles.top[currentThemeId]]: isTop,
        }
      )}
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
        className={clsx(classes?.button, styles.button[currentThemeId], {
          [styles.hasPopup[currentThemeId]]: hasPopup,
          [styles.pointer[currentThemeId]]: isPointer,
        })}
        onClick={onActivate}
        onKeyDown={(e) => {
          const parentMenuitem =
            rootRef.current?.parentElement?.closest<HTMLElement>(
              `.${styles.root[currentThemeId]}`
            );
          const parentMenuitemButton =
            parentMenuitem?.querySelector<HTMLElement>(
              `.${styles.button[currentThemeId]}`
            );
          const childMenuitemButtons = getChildMenuitemButtons();
          const siblingMenuitemButtons = Array.from<HTMLElement>(
            rootRef.current?.parentElement?.querySelectorAll(
              `:scope > .${styles.root[currentThemeId]} > .${styles.button[currentThemeId]}`
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
                  parentMenuitem?.matches(
                    `.${styles.horizontal[currentThemeId]}`
                  )
                ) {
                  const parentMenuitemButtons = Array.from<HTMLElement>(
                    parentMenuitem?.parentElement?.querySelectorAll(
                      `:scope > .${styles.root[currentThemeId]} > .${styles.button[currentThemeId]}`
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
                    `.${styles.root[currentThemeId]}`
                  );

                  if (
                    topMenuitemButton &&
                    topMenuitem?.matches(
                      `.${styles.horizontal[currentThemeId]}`
                    )
                  ) {
                    const topMenuitemButtons = Array.from<HTMLElement>(
                      topMenuitem?.parentElement?.querySelectorAll(
                        `:scope > .${styles.root[currentThemeId]} > .${styles.button[currentThemeId]}`
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
            className={clsx(classes?.icon, styles.icon[currentThemeId])}
            theme={theme}
          />
        )}
        <span
          className={clsx(classes?.title, styles.title[currentThemeId])}
          id={`${id}-title`}>
          {title}
        </span>
      </button>
      <MenuitemContext.Provider value={contextValue}>
        {children}
      </MenuitemContext.Provider>
    </li>
  );
};

Menuitem.displayName = "Menuitem";
