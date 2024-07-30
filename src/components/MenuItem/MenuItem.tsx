import clsx from "clsx";
import {
  ForwardRefExoticComponent,
  FunctionComponent,
  HTMLAttributes,
  ReactElement,
  RefAttributes,
  SVGAttributes,
  useCallback,
  useContext,
  useId,
  useMemo,
  useRef,
  useState,
} from "react";

import { MenuContext, MenuitemContext, MenuitemContextValue } from "@/contexts";

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
        disabled?: boolean;
        onClick?(): void;
        title: string;
      } & (
        | {
            Icon?: ForwardRefExoticComponent<
              SVGAttributes<SVGSVGElement> & RefAttributes<SVGSVGElement>
            >;
            children?: ReactElement;
          }
        | {
            checked?: boolean;
            type: "checkbox" | "radio";
          }
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
  const { bar, close, horizontal, vertical } = useContext(MenuContext);

  const id = useId();

  const rootRef = useRef<HTMLLIElement>(null);

  const [expanded, setExpanded] = useState<boolean>(false);

  const closeMenuitem = useCallback(() => {
    // return focus to this parent
    rootRef.current?.focus();

    setExpanded(false);
  }, []);

  const menuitemContextValue = useMemo<MenuitemContextValue>(
    () => ({
      close: closeMenuitem,
      expanded,
    }),
    [closeMenuitem, expanded]
  );

  const expandable = Boolean(children);

  if ("separator" in restProps) {
    const { separator, ...props } = restProps;

    return (
      <li
        {...props}
        className={clsx(className, classes?.root, styles.separator, {
          [styles.bar]: bar,
          [styles.horizontal]: horizontal,
          [styles.vertical]: vertical,
        })}
        ref={rootRef}
        role="separator"
        tabIndex={-1}
      />
    );
  }

  const { disabled, onClick, ...props } = restProps;
  const Icon = "Icon" in restProps && restProps.Icon;
  const checked = ("checked" in restProps && restProps.checked) ?? false;
  const type = "type" in restProps ? restProps.type : undefined;

  // @todo handle checkbox, checked, radio…

  return (
    <li
      {...props}
      aria-checked={type ? checked : undefined}
      aria-disabled={disabled}
      aria-expanded={expanded}
      aria-haspopup={expandable ? "menu" : undefined}
      aria-labelledby={`${id}-title`}
      className={clsx(className, classes?.root, styles.root, {
        [styles.bar]: bar,
        [styles.horizontal]: horizontal,
        [styles.vertical]: vertical,
      })}
      onBlur={({ relatedTarget }) => {
        if (expandable && !rootRef.current?.contains(relatedTarget)) {
          setExpanded(false);
        }
      }}
      onFocus={() => {
        if (expandable) {
          setExpanded(true);
        }
      }}
      onMouseEnter={() => {
        if (
          rootRef.current
            ?.closest('[role="menubar"]')
            ?.contains(document.activeElement)
        ) {
          rootRef.current?.focus();
        }
      }}
      onPointerDown={() => {
        if (!disabled && (!type || !checked) && expandable) {
          setExpanded((prevState) => !prevState);
        }
      }}
      onPointerUp={() => {
        if (!disabled && (!type || !checked)) {
          onClick?.();

          if (!expandable) {
            close();
          }
        }
      }}
      ref={rootRef}
      role={
        (type === "checkbox" && "menuitemcheckbox") ||
        (type === "radio" && "menuitemradio") ||
        "menuitem"
      }
      tabIndex={0}>
      {Icon && (
        <Icon aria-hidden className={clsx(classes?.icon, styles.icon)} />
      )}
      <span className={clsx(classes?.title, styles.title)} id={`${id}-title`}>
        {title}
      </span>
      <MenuitemContext.Provider value={menuitemContextValue}>
        {children}
      </MenuitemContext.Provider>
    </li>
  );
};
