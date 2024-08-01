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
import { getChildMenuitemToFocus, removeProps } from "@/utils";

import styles from "./Menuitem.module.css";

export type MenuitemProps = Omit<
  HTMLAttributes<HTMLLIElement>,
  | "aria-checked"
  | "aria-disabled"
  | "aria-expanded"
  | "aria-haspopup"
  | "aria-labelledby"
  | "checked"
  | "disabled"
  | "onClick"
  | "role"
  | "tabIndex"
  | "title"
  | "type"
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
  ...props
}) => {
  const { isFocusWithin } = useContext(MenubarContext);

  const id = useId();

  const rootRef = useRef<HTMLLIElement>(null);

  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  if ("separator" in props) {
    return (
      <li
        {...removeProps<HTMLAttributes<HTMLLIElement>>(props, ["separator"])}
        className={clsx(className, classes?.root, styles.root)}
        role="separator"
        tabIndex={-1}
      />
    );
  }

  const { onKeyDown, onMouseEnter } = props;
  const Icon = "Icon" in props && props.Icon;
  const checked = ("checked" in props && props.checked) ?? false;
  const disabled = ("disabled" in props && props.disabled) ?? false;
  const onClick = "onClick" in props ? props.onClick : undefined;
  const title = "title" in props ? props.title : undefined;
  const type = "type" in props ? props.type : undefined;

  return (
    <li
      {...removeProps<HTMLAttributes<HTMLLIElement>>(props, [
        "checked",
        "disabled",
        "Icon",
        "onClick",
        "onKeyDown",
        "onMouseEnter",
        "title",
        "type",
      ])}
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
          ? undefined
          : () => {
              onClick?.();

              if (children) {
                if (!isExpanded) {
                  getChildMenuitemToFocus(rootRef.current)?.focus();
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

                (
                  getChildMenuitemToFocus(rootRef.current) ?? rootRef.current
                )?.focus();
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