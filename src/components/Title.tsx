import clsx from "clsx";
import { type FunctionComponent, type HTMLAttributes, useId } from "react";

export const Title: FunctionComponent<HTMLAttributes<HTMLHeadingElement>> = ({
  children,
  className,
  ...props
}) => {
  const uniqueId = useId();
  const id = props.id ?? uniqueId;

  return (
    <h1 {...props} className={clsx("title", className)} id={id}>
      {children}
    </h1>
  );
};
