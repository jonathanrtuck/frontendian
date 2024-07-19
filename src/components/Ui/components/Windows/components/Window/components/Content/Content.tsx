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
    onResize(size: { height: number; width: number }): void;
    width: number;
  }
> = ({ className, height, onResize, width, ...props }) => {
  const scrollbarSize = useMemo<number>(
    () => getComputedCustomProperty("--content-scrollbar-size"),
    []
  );

  return (
    <Resizable
      handle={
        <Resize aria-hidden className={styles.resize} role="presentation" />
      }
      height={height}
      minConstraints={[MIN_WIDTH, MIN_HEIGHT]}
      onResize={(_, { size }) => {
        onResize(size);
      }}
      width={width}>
      <div
        {...props}
        className={clsx(className, styles.root)}
        style={{
          height: height + scrollbarSize,
          width: width + scrollbarSize,
        }}>
        content…
      </div>
    </Resizable>
  );
};
