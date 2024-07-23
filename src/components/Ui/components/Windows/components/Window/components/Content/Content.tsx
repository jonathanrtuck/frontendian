import clsx from "clsx";
import {
  FunctionComponent,
  HTMLAttributes,
  PropsWithChildren,
  RefObject,
  useMemo,
} from "react";
import { Resizable } from "react-resizable";

import { ResizeHandle } from "./components/ResizeHandle";
import { ErrorBoundary } from "components/ErrorBoundary";
import { getComputedCustomProperty } from "utils";

import styles from "./Content.module.css";

const MIN_HEIGHT = 16 * 7; // 7rem
const MIN_WIDTH = 16 * 7; // 7rem

export type ContentProps = Omit<HTMLAttributes<HTMLDivElement>, "onResize"> &
  PropsWithChildren<{
    height: number;
    menubarRef: RefObject<HTMLElement>;
    onResize(size: { height: number; width: number }): void;
    width: number;
    zoomed: boolean;
  }>;

export const Content: FunctionComponent<ContentProps> = ({
  children,
  className,
  height,
  menubarRef,
  onResize,
  width,
  zoomed,
  ...props
}) => {
  const minWidth = menubarRef.current
    ? Array.from(menubarRef.current.children)
        .map((element) => (element as HTMLElement).offsetWidth)
        .reduce((acc, width) => acc + width, 0)
    : 0;
  const scrollbarSize = useMemo<number>(
    () => getComputedCustomProperty("--content-scrollbar-size"),
    []
  );

  return (
    <Resizable
      axis={zoomed ? "none" : "both"}
      handle={
        <ResizeHandle
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
        <ErrorBoundary
          onError={() => {
            console.debug("error…"); // @todo
          }}>
          {children}
        </ErrorBoundary>
      </div>
    </Resizable>
  );
};
