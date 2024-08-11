import clsx from "clsx";
import {
  Fragment,
  FunctionComponent,
  PropsWithChildren,
  useContext,
  useLayoutEffect,
  useState,
} from "react";
import { Resizable } from "react-resizable";

import { WindowContext } from "@/contexts";
import { useComputedCustomProperty } from "@/hooks";
import {
  activateWindow,
  inactivateWindow,
  resizeWindow,
  useStore,
} from "@/store";

import { ResizeHandle } from "./components/ResizeHandle";

import styles from "./Content.module.css";

const MIN_HEIGHT = 16 * 7; // 7rem
const MIN_WIDTH = 16 * 7; // 7rem

export type ContentProps = PropsWithChildren;

export const Content: FunctionComponent<ContentProps> = ({ children }) => {
  const {
    active,
    height: heightState,
    id,
    menubarRef,
    scrollable,
    width: widthState,
    zoomed,
  } = useContext(WindowContext);

  const windows = useStore((state) => state.windows);

  const [height, setHeight] = useState<number>(heightState);
  const [width, setWidth] = useState<number>(widthState);

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
  const siblingWindowIds = windows
    .map((window) => window.id)
    .filter((windowId) => windowId !== id);
  const hasSiblingWindows = siblingWindowIds.length !== 0;

  useLayoutEffect(() => {
    setHeight(heightState);
  }, [heightState]);

  useLayoutEffect(() => {
    setWidth(widthState);
  }, [widthState]);

  return (
    <Resizable
      axis={zoomed ? "none" : "both"}
      handle={
        scrollable ? (
          <ResizeHandle
            aria-hidden
            className={clsx(styles.resize, {
              [styles.resizing]: isResizing,
              [styles.zoomed]: zoomed,
            })}
          />
        ) : (
          <Fragment /> // eslint-disable-line react/jsx-no-useless-fragment
        )
      }
      height={height}
      minConstraints={[
        Math.max(minWidth, MIN_WIDTH) - scrollbarSize,
        MIN_HEIGHT,
      ]}
      onResize={(_, { size }) => {
        setHeight(size.height);
        setWidth(size.width);
      }}
      onResizeStart={() => {
        if (hasSiblingWindows) {
          inactivateWindow({ ids: siblingWindowIds });
        }
        setIsResizing(true);
      }}
      onResizeStop={() => {
        if (hasSiblingWindows) {
          activateWindow({ ids: siblingWindowIds });
        }
        setIsResizing(false);

        if (height !== heightState || width !== widthState) {
          resizeWindow({ height, id, width });
        }
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
          inert={!active ? "" : undefined}
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

Content.displayName = "Content";
