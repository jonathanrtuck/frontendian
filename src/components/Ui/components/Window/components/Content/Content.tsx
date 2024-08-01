import clsx from "clsx";
import {
  FunctionComponent,
  PropsWithChildren,
  useContext,
  useState,
} from "react";
import { Resizable } from "react-resizable";

import { WindowContext } from "@/contexts";
import { useComputedCustomProperty } from "@/hooks";
import { resizeWindow } from "@/store";

import { ResizeHandle } from "./components/ResizeHandle";

import styles from "./Content.module.css";

const MIN_HEIGHT = 16 * 7; // 7rem
const MIN_WIDTH = 16 * 7; // 7rem

export type ContentProps = PropsWithChildren;

export const Content: FunctionComponent<ContentProps> = ({ children }) => {
  const { height, id, inert, menubarRef, scrollable, width, zoomed } =
    useContext(WindowContext);

  const [isResizing, setIsResizing] = useState<boolean>(false);

  const minWidth = menubarRef.current
    ? Array.from(menubarRef.current.children)
        .map((element) => (element as HTMLElement).offsetWidth)
        .reduce((acc, width) => acc + width, 0)
    : 0;
  const scrollbarSizeProperty = useComputedCustomProperty(
    "--content-scrollbar-size"
  );
  const scrollbarSize = scrollable ? scrollbarSizeProperty : 0;

  return (
    <Resizable
      axis={zoomed ? "none" : "both"}
      handle={(_, ref) =>
        scrollable ? (
          <ResizeHandle
            aria-hidden
            className={clsx(styles.resize, {
              [styles.resizing]: isResizing,
              [styles.zoomed]: zoomed,
            })}
            ref={ref}
          />
        ) : null
      }
      height={height}
      minConstraints={[
        Math.max(minWidth, MIN_WIDTH) - scrollbarSize,
        MIN_HEIGHT,
      ]}
      onResize={(_, { size }) => {
        resizeWindow({ id, ...size });
      }}
      onResizeStart={() => {
        setIsResizing(true);
      }}
      onResizeStop={() => {
        setIsResizing(false);
      }}
      width={width}>
      <div className={styles.root}>
        <div
          className={clsx(styles.content, {
            [styles.resizing]: isResizing,
            [styles.scrollable]: scrollable,
            [styles.zoomed]: zoomed,
          })}
          draggable={false}
          inert={inert ? "" : undefined}
          style={
            zoomed
              ? undefined
              : {
                  height: height + scrollbarSize,
                  width: width + scrollbarSize,
                }
          }>
          {children}
        </div>
      </div>
    </Resizable>
  );
};
