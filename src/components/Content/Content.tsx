import clsx from "clsx";
import {
  Fragment,
  FunctionComponent,
  PropsWithChildren,
  useContext,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { Resizable } from "react-resizable";

import { Resize } from "@/icons";
import { WindowContext } from "@/contexts";
import { resizeWindow, useStore } from "@/store";

import styles from "./Content.module.css";

const MIN_HEIGHT = 16 * 7; // 7rem
const MIN_WIDTH = 16 * 10; // 10rem

export type ContentProps = PropsWithChildren;

export const Content: FunctionComponent<ContentProps> = ({ children }) => {
  const {
    collapsed,
    height: heightState,
    id,
    menubarRef,
    scrollable,
    width: widthState,
  } = useContext(WindowContext);

  const theme = useStore((state) => state.theme);

  const rootRef = useRef<HTMLDivElement>(null);

  const [height, setHeight] = useState<number>(heightState);
  const [width, setWidth] = useState<number>(widthState);

  const [hasHorizontalOverflow, setHasHorizontalOverflow] =
    useState<boolean>(false);
  const [hasVerticalOverflow, setHasVerticalOverflow] =
    useState<boolean>(false);
  const [isResizing, setIsResizing] = useState<boolean>(false);

  const minWidth = menubarRef.current
    ? Array.from(menubarRef.current.children)
        .map((element) => (element as HTMLElement).offsetWidth)
        .reduce((acc, width) => acc + width, 0)
    : 0;

  useLayoutEffect(() => {
    setHeight(heightState);
  }, [heightState]);

  useLayoutEffect(() => {
    setWidth(widthState);
  }, [widthState]);

  useLayoutEffect(() => {
    if (rootRef.current) {
      setHasHorizontalOverflow(
        rootRef.current.scrollWidth > rootRef.current.clientWidth
      );
      setHasVerticalOverflow(
        rootRef.current.scrollHeight > rootRef.current.clientHeight
      );
    }
  }, [children, height, width]);

  return (
    <Resizable
      axis="both"
      handle={
        scrollable && !collapsed ? (
          <Resize aria-hidden className={styles.resize} themeId={theme.id} />
        ) : (
          <Fragment /> // eslint-disable-line react/jsx-no-useless-fragment
        )
      }
      height={height}
      minConstraints={[Math.max(minWidth, MIN_WIDTH), MIN_HEIGHT]}
      onResize={(_, { size }) => {
        setHeight(size.height);
        setWidth(size.width);
      }}
      onResizeStart={() => {
        setIsResizing(true);
      }}
      onResizeStop={() => {
        setIsResizing(false);

        if (height !== heightState || width !== widthState) {
          resizeWindow({ height, id, width });
        }
      }}
      width={width}>
      <div
        className={clsx(styles.root, {
          [styles.overflowHorizontal]: hasHorizontalOverflow,
          [styles.overflowVertical]: hasVerticalOverflow,
          [styles.resizing]: isResizing,
          [styles.scrollable]: scrollable,
        })}
        draggable={false}
        ref={rootRef}
        style={{
          height,
          width,
        }}>
        {children}
      </div>
    </Resizable>
  );
};

Content.displayName = "Content";
