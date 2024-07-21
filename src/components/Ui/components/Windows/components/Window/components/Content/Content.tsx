import clsx from "clsx";
import { FunctionComponent, HTMLAttributes, RefObject, useMemo } from "react";
import { createPortal } from "react-dom";
import { Resizable } from "react-resizable";

import { MenuItem } from "components/MenuItem";
import { Resize } from "icons";
import { getComputedCustomProperty } from "utils";

import styles from "./Content.module.css";

const MIN_HEIGHT = 16 * 7; // 7rem
const MIN_WIDTH = 16 * 7; // 7rem

export const Content: FunctionComponent<
  Omit<HTMLAttributes<HTMLDivElement>, "onResize"> & {
    height: number;
    menuBarRef: RefObject<HTMLElement>;
    onResize(size: { height: number; width: number }): void;
    width: number;
    zoomed: boolean;
  }
> = ({ className, height, menuBarRef, onResize, width, zoomed, ...props }) => {
  const minWidth = menuBarRef.current
    ? Array.from(menuBarRef.current.children)
        .map((element) => (element as HTMLElement).offsetWidth)
        .reduce((acc, width) => acc + width, 0)
    : 0;
  const scrollbarSize = useMemo<number>(
    () => getComputedCustomProperty("--content-scrollbar-size"),
    []
  );

  return (
    <>
      {/* @todo move this into Application component */}
      {menuBarRef.current &&
        createPortal(
          <>
            <MenuItem title="File" />
            <MenuItem title="View" />
            <MenuItem title="Help" />
          </>,
          menuBarRef.current
        )}
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
        minConstraints={[
          Math.max(minWidth, MIN_WIDTH) - scrollbarSize,
          MIN_HEIGHT,
        ]}
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
          application…
        </div>
      </Resizable>
    </>
  );
};
