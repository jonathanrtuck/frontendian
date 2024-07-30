import clsx from "clsx";
import {
  ForwardRefExoticComponent,
  FunctionComponent,
  HTMLAttributes,
  ReactElement,
  RefAttributes,
  SVGAttributes,
  useContext,
  useId,
  useRef,
  useState,
} from "react";

import { MenuContext, MenuitemContext } from "@/contexts";

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
    | {
        Icon?: ForwardRefExoticComponent<
          SVGAttributes<SVGSVGElement> & RefAttributes<SVGSVGElement>
        >;
        children?: ReactElement;
        disabled?: boolean;
        onClick?(): void;
        title: string;
      }
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
  const { bar, horizontal, ref, vertical } = useContext(MenuContext);

  const id = useId();

  const rootRef = useRef<HTMLLIElement>(null);

  const [expanded, setExpanded] = useState<boolean>(false);

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

  const { Icon, disabled, onClick, ...props } = restProps;

  return (
    <li
      {...props}
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
        if (!rootRef.current?.contains(relatedTarget)) {
          setExpanded(false);
        }
      }}
      onClick={() => {
        if (!disabled) {
          onClick?.();
        }
      }}
      onFocus={() => {
        setExpanded(true);
      }}
      onMouseEnter={() => {
        if (ref.current?.contains(document.activeElement)) {
          rootRef.current?.focus();
        }
      }}
      ref={rootRef}
      role="menuitem"
      tabIndex={0}>
      {Icon && (
        <Icon aria-hidden className={clsx(classes?.icon, styles.icon)} />
      )}
      <span className={clsx(classes?.title, styles.title)} id={`${id}-title`}>
        {title}
      </span>
      <MenuitemContext.Provider value={{ expanded }}>
        {children}
      </MenuitemContext.Provider>
    </li>
  );
};
