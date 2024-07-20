import clsx from "clsx";
import { FunctionComponent, HTMLAttributes, useMemo } from "react";
import { Resizable } from "react-resizable";

import { Resize } from "icons";
import { getComputedCustomProperty } from "utils";

import styles from "./Content.module.css";

const MIN_HEIGHT = 16 * 7; // 7rem
const MIN_WIDTH = 16 * 7; // 7rem

export const Content: FunctionComponent<
  Omit<HTMLAttributes<HTMLDivElement>, "onResize"> & {
    height: number;
    minWidth?: number;
    onResize(size: { height: number; width: number }): void;
    width: number;
    zoomed: boolean;
  }
> = ({
  className,
  height,
  minWidth = MIN_WIDTH,
  onResize,
  width,
  zoomed,
  ...props
}) => {
  const scrollbarSize = useMemo<number>(
    () => getComputedCustomProperty("--content-scrollbar-size"),
    []
  );

  return (
    <Resizable
      axis={zoomed ? "none" : "both"}
      handle={
        <Resize
          aria-hidden
          className={clsx(styles.resize, {
            [styles.zoomed]: zoomed,
          })}
          role="presentation"
        />
      }
      height={height}
      minConstraints={[minWidth - scrollbarSize, MIN_HEIGHT]}
      onResize={(_, { size }) => {
        onResize(size);
      }}
      width={width}>
      <div
        {...props}
        className={clsx(className, styles.root)}
        style={
          zoomed
            ? undefined
            : {
                height: height + scrollbarSize,
                width: width + scrollbarSize,
              }
        }>
        content…
      </div>
    </Resizable>
  );
};
