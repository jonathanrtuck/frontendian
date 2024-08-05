import clsx from "clsx";
import {
  FunctionComponent,
  HTMLAttributes,
  ReactElement,
  UIEvent,
  useContext,
  useId,
  useLayoutEffect,
  useRef,
  useState,
} from "react";

import { MenuContext, MenuitemContext } from "@/contexts";
import { IconComponent } from "@/types";
import { removeProps } from "@/utils";

import styles from "./Menuitem.module.css";

export type MenuitemProps = Omit<
  HTMLAttributes<HTMLLIElement>,
  "onClick" | "role"
> & {
  classes?: {
    button?: string;
    icon?: string;
    menuitem?: string;
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
  const { inactivate, isActive, isFocusWithin, isPointer, isTop, orientation } =
    useContext(MenuContext);
  const { topButtonRef: parentTopButtonRef } = useContext(MenuitemContext);

  const id = useId();

  const rootRef = useRef<HTMLLIElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const [tabIndex, setTabIndex] = useState<-1 | 0>(-1);

  const topButtonRef = isTop ? buttonRef : parentTopButtonRef;

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
        className={clsx(className, classes?.separator, styles.separator)}
        onClick={() => {
          topButtonRef.current?.focus();

          inactivate();
        }}
        onMouseEnter={(e) => {
          props.onMouseEnter?.(e);

          if (isActive) {
            (e.target as HTMLElement).focus();
          }
        }}
        role="separator"
        tabIndex={-1}
      />
    );
  }

  const Icon = "Icon" in props && props.Icon;
  const checked = ("checked" in props && props.checked) ?? false;
  const disabled = ("disabled" in props && props.disabled) ?? false;
  const onClick = "onClick" in props ? props.onClick : undefined;
  const title = "title" in props ? props.title : undefined;
  const type = "type" in props ? props.type : undefined;

  const haspopup = Boolean(children);

  const getChildMenuitemButtons = (): HTMLElement[] =>
    Array.from(
      rootRef.current?.querySelectorAll(
        `:scope > [role="menu"] > .${styles.menuitem} > .${styles.button}`
      ) ?? []
    );
  const getParentMenuitemButton = (): HTMLElement | undefined =>
    rootRef.current?.parentElement
      ?.closest(`.${styles.menuitem}`)
      ?.querySelector(`.${styles.button}`) ?? undefined;
  const getSiblingMenuitemButtons = (): HTMLElement[] =>
    Array.from(
      rootRef.current?.parentElement?.querySelectorAll(
        `:scope > .${styles.menuitem} > .${styles.button}`
      ) ?? []
    );
  const onActivate = (e: UIEvent): void => {
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
      className={clsx(
        className,
        classes?.menuitem,
        styles.menuitem,
        styles[orientation],
        {
          [styles.top]: isTop,
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
        className={clsx(classes?.button, styles.button, {
          [styles.checkbox]: type === "checkbox",
          [styles.checked]: checked,
          [styles.disabled]: disabled,
          [styles.expanded]: isExpanded,
          [styles.haspopup]: haspopup,
          [styles.pointer]: isPointer,
          [styles.radio]: type === "radio",
        })}
        onClick={onActivate}
        onKeyDown={(e) => {
          const menuitem = e.target as HTMLElement;
          const childMenuitemButtons = getChildMenuitemButtons();
          const siblingMenuitemButtons = getSiblingMenuitemButtons();
          const index = siblingMenuitemButtons.indexOf(menuitem);
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
                  siblingMenuitemButtons
                    .at(isFirstMenuitem ? -1 : index - 1)
                    ?.focus();
                }
              } else {
                menuitem.blur();
                getParentMenuitemButton()?.focus();
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
              } else if (haspopup) {
                setIsExpanded(true);
                childMenuitemButtons.at(0)?.focus();
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
              onActivate(e);
              break;
            case "Escape":
              menuitem.blur();
              topButtonRef.current?.focus();
              break;
          }
        }}
        onMouseEnter={(e) => {
          if (isActive) {
            if (isTop) {
              setTabIndex(0);
            }

            if (haspopup) {
              setIsExpanded(true);

              getChildMenuitemButtons().at(0)?.focus();
            } else {
              (e.target as HTMLElement).focus();
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
        {Icon && (
          <Icon aria-hidden className={clsx(classes?.icon, styles.icon)} />
        )}
        <span className={clsx(classes?.title, styles.title)} id={`${id}-title`}>
          {title}
        </span>
      </button>
      <MenuitemContext.Provider
        value={{
          isExpanded,
          topButtonRef,
        }}>
        {children}
      </MenuitemContext.Provider>
    </li>
  );
};
