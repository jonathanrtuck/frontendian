import clsx from "clsx";
import {
  FocusEvent,
  FunctionComponent,
  HTMLAttributes,
  ReactElement,
  useContext,
  useId,
  useRef,
  useState,
} from "react";

import { MenubarContext } from "@/contexts";
import { IconComponent } from "@/types";

import styles from "./Menuitem.module.css";

export type MenuitemProps = Omit<
  HTMLAttributes<HTMLLIElement>,
  | "aria-disabled"
  | "aria-expanded"
  | "aria-haspopup"
  | "aria-label"
  | "onClick"
  | "role"
  | "tabIndex"
> & {
  classes?: {
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
  title,
  ...restProps
}) => {
  const { isFocusWithin } = useContext(MenubarContext);

  const id = useId();

  const rootRef = useRef<HTMLLIElement>(null);

  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  if ("separator" in restProps) {
    const { separator, ...props } = restProps;

    return (
      <li
        {...props}
        className={clsx(className, classes?.root, styles.separator)}
        role="separator"
        tabIndex={-1}
      />
    );
  }

  const { onKeyDown, onMouseEnter, ...props } = restProps;
  const Icon = "Icon" in restProps && restProps.Icon;
  const checked = ("checked" in restProps && restProps.checked) ?? false;
  const disabled = ("disabled" in restProps && restProps.disabled) ?? false;
  const onClick = "onClick" in restProps ? restProps.onClick : undefined;
  const type = "type" in restProps ? restProps.type : undefined;

  const getMenuitemToFocus = (): HTMLElement | undefined => {
    const menuitems = Array.from<HTMLElement>(
      rootRef.current?.querySelectorAll(
        ':scope > [role="menu"] > [role^="menuitem"]'
      ) ?? []
    );

    return (
      menuitems.find((menuitem) =>
        menuitem.matches(':not([aria-checked="true"], [aria-disabled="true"])')
      ) ?? menuitems[0]
    );
  };

  return (
    <li
      {...props}
      aria-checked={type ? checked : undefined}
      aria-disabled={disabled}
      aria-expanded={children ? isExpanded : undefined}
      aria-haspopup={children ? "menu" : undefined}
      aria-labelledby={`${id}-title`}
      className={clsx(className, classes?.root, styles.root)}
      onBlur={(e: FocusEvent<HTMLLIElement>) => {
        props.onBlur?.(e);

        if (
          !rootRef.current?.contains(e.relatedTarget ?? document.activeElement)
        ) {
          setIsExpanded(false);
        }
      }}
      onClick={
        checked || disabled
          ? onClick
          : () => {
              onClick?.();

              if (children) {
                if (!isExpanded) {
                  getMenuitemToFocus()?.focus();
                }

                setIsExpanded((prevState) => !prevState);
              }
            }
      }
      onKeyDown={
        checked || disabled
          ? onKeyDown
          : (e) => {
              onKeyDown?.(e);

              if (children && (e.key === "Enter" || e.key === " ")) {
                // @todo
              }
            }
      }
      onMouseEnter={
        checked || disabled
          ? onMouseEnter
          : (e) => {
              onMouseEnter?.(e);

              if (isFocusWithin) {
                setIsExpanded(true);

                (getMenuitemToFocus() ?? rootRef.current)?.focus();
              }
            }
      }
      ref={rootRef}
      role={
        (type === "checkbox" && "menuitemcheckbox") ||
        (type === "radio" && "menuitemradio") ||
        "menuitem"
      }
      tabIndex={-1}>
      {Icon && (
        <Icon aria-hidden className={clsx(classes?.icon, styles.icon)} />
      )}
      <span className={clsx(classes?.title, styles.title)} id={`${id}-title`}>
        {title}
      </span>
      {children}
    </li>
  );
};
