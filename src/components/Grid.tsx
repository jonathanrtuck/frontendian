import { useSelection } from "@/hooks";
import clsx from "clsx";
import { type FunctionComponent, type HTMLAttributes, useRef } from "react";

export const Grid: FunctionComponent<
  HTMLAttributes<HTMLDivElement> & {
    classes?: Partial<{
      root: string;
      selection: string;
    }>;
  }
> = ({ children, classes = {}, className, ...props }) => {
  const rootRef = useRef<HTMLDivElement>(null);
  const selection = useSelection(rootRef);

  return (
    <div
      {...props}
      className={clsx("grid", className, classes.root)}
      ref={rootRef}
    >
      {children}
      {selection.from && selection.to ? (
        <mark
          {...props}
          aria-hidden
          className={clsx("grid-selection", classes.selection)}
          style={{
            height: Math.abs(selection.from.y - selection.to.y),
            left: Math.min(selection.from.x, selection.to.x),
            top: Math.min(selection.from.y, selection.to.y),
            width: Math.abs(selection.from.x - selection.to.x),
          }}
        />
      ) : null}
    </div>
  );
};
