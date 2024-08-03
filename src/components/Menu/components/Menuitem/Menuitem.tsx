import clsx from "clsx";
import {
  FunctionComponent,
  HTMLAttributes,
  ReactElement,
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

const getChildMenuitems = (root: HTMLElement | null): HTMLElement[] =>
  Array.from(
    root?.querySelectorAll(
      `:scope > [role="menu"] > .${styles.root} > .${styles.button}`
    ) ?? []
  );

export type MenuitemProps = Omit<
  HTMLAttributes<HTMLLIElement>,
  "onClick" | "role"
> & {
  classes?: {
    button?: string;
    icon?: string;
    root?: string;
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
  const {
    isActive,
    isFocusWithin,
    isPointer,
    isTop,
    orientation,
    setIsActive,
  } = useContext(MenuContext);
  const { collapse: parentCollapse } = useContext(MenuitemContext);

  const id = useId();

  const rootRef = useRef<HTMLLIElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const [isExpandedClick, setIsExpandedClick] = useState<boolean>(false);
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const [tabIndex, setTabIndex] = useState<-1 | 0>(-1);

  useLayoutEffect(() => {
    setTabIndex((prevState) => {
      if (
        isFocusWithin &&
        isTop &&
        rootRef.current?.matches(":first-of-type") &&
        !rootRef.current.matches(":focus-within")
      ) {
        return -1;
      }

      if (!isFocusWithin) {
        return isTop && rootRef.current?.matches(":first-of-type") ? 0 : -1;
      }

      return prevState;
    });
  }, [isFocusWithin, isTop]);

  if ("separator" in props) {
    return (
      <li
        {...removeProps<HTMLAttributes<HTMLLIElement>>(props, ["separator"])}
        className={clsx(className, classes?.root, styles.root)}
        role="separator"
      />
    );
  }

  const Icon = "Icon" in props && props.Icon;
  const checked = ("checked" in props && props.checked) ?? false;
  const disabled = ("disabled" in props && props.disabled) ?? false;
  const onClick = "onClick" in props ? props.onClick : undefined;
  const title = "title" in props ? props.title : undefined;
  const type = "type" in props ? props.type : undefined;
  const collapse = isTop
    ? () => {
        buttonRef.current?.focus();

        if (children) {
          setIsExpanded(false);
        }

        setIsActive(false);
      }
    : parentCollapse;

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
      className={clsx(className, classes?.root, styles.root)}
      onBlur={(e) => {
        props.onBlur?.(e);

        if (
          children &&
          document.hasFocus() &&
          !e.currentTarget?.contains(e.relatedTarget)
        ) {
          setIsExpanded(false);
          setTabIndex(-1);
        }
      }}
      onFocus={(e) => {
        props.onFocus?.(e);

        setTabIndex(0);

        console.debug("isActive", isActive);

        if (isActive && children) {
          setIsExpanded(true);
        }
      }}
      ref={rootRef}
      role="none">
      <button
        aria-checked={type ? checked : undefined}
        aria-disabled={disabled}
        aria-expanded={children ? isExpanded : undefined}
        aria-haspopup={children ? "menu" : undefined}
        aria-labelledby={`${id}-title`}
        className={clsx(classes?.button, styles.button, {
          [styles.pointer]: isPointer,
        })}
        onClick={() => {
          onClick?.();

          if (isTop && children && !isExpandedClick) {
            getChildMenuitems(rootRef.current)[0]?.focus();
          } else {
            collapse();
          }
        }}
        onKeyDown={(e) => {
          const isMenubaritem =
            rootRef.current?.matches('[role="menubar"] > :scope') ?? false;

          switch (e.key) {
            case "ArrowDown":
              if (isMenubaritem) {
                if (orientation === "horizontal") {
                  // expand();
                }
              } else {
                // @todo focus and expand next item
              }
              break;
            case "ArrowLeft":
              if (isMenubaritem) {
                // @todo focus and expand prev item
              } else if (children) {
                // collapse();
                // @todo focus parent menuitem
              }
              break;
            case "ArrowRight":
              if (isMenubaritem) {
                // @todo focus next item
              } else if (children) {
                // expand();
              }
              break;
            case "ArrowUp":
              if (!isMenubaritem) {
                // @todo focus prev item
              }
              break;
            case "Enter":
              if (children) {
                // @todo focus child menuitem
              } else if (!checked && !disabled) {
                // onClick?.();
              }
              break;
            case "Escape":
              // @todo focus and collapse parent
              break;
          }
        }}
        onMouseEnter={(e) => {
          if (isActive) {
            if (children) {
              getChildMenuitems(rootRef.current)[0]?.focus();
            } else {
              (e.target as HTMLElement).focus();
            }
          }
        }}
        onPointerDown={(e) => {
          if (children && isExpanded) {
            e.preventDefault();
          }

          if (isTop && children) {
            setIsExpandedClick(isExpanded);
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
          collapse,
        }}>
        {children}
      </MenuitemContext.Provider>
    </li>
  );
};
