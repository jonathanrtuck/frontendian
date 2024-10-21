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

import { WindowContext } from "@/contexts";
import { useComputedCustomProperty, useStyles } from "@/hooks";
import { Resize } from "@/icons";
import { resizeWindow, useStore } from "@/store";

import stylesBeos from "./Content.beos.module.css";
import stylesMacOsClassic from "./Content.mac-os-classic.module.css";

const MIN_HEIGHT = 16 * 7; // 7rem
const MIN_WIDTH = 16 * 10; // 10rem

export type ContentProps = PropsWithChildren;

export const Content: FunctionComponent<ContentProps> = ({ children }) => {
  const { collapsed, height, id, menubarRef, resizable, scrollable, width } =
    useContext(WindowContext);

  const theme = useStore((state) => state.theme);

  const contentRef = useRef<HTMLDivElement>(null);
  const rootRef = useRef<HTMLDivElement>(null);

  const [hasHorizontalOverflow, setHasHorizontalOverflow] =
    useState<boolean>(false);
  const [hasVerticalOverflow, setHasVerticalOverflow] =
    useState<boolean>(false);

  const scrollbarSize = useComputedCustomProperty(
    rootRef.current,
    "--scrollbar-size"
  );
  const styles = useStyles({
    "theme-beos": stylesBeos,
    "theme-mac-os-classic": stylesMacOsClassic,
  });

  const minWidth = menubarRef.current
    ? Array.from(menubarRef.current.children)
        .map((element) => (element as HTMLElement).offsetWidth)
        .reduce((acc, width) => acc + width, 0)
    : 0;

  useLayoutEffect(() => {
    const rootElement = rootRef.current;
    const contentElement = contentRef.current;

    if (rootElement && contentElement) {
      const setOverflow = () => {
        setHasHorizontalOverflow(
          contentElement.scrollWidth > rootElement.clientWidth
        );
        setHasVerticalOverflow(
          contentElement.scrollHeight > rootElement.clientHeight
        );
      };
      const resizeObserver = new ResizeObserver(setOverflow);

      resizeObserver.observe(contentElement);

      setOverflow();

      return () => {
        resizeObserver.unobserve(contentElement);
      };
    }
  }, [children, height, width]);

  return (
    <Resizable
      axis="both"
      handle={
        // @see https://github.com/react-grid-layout/react-resizable?tab=readme-ov-file#custom-function
        resizable && !collapsed ? (
          // eslint-disable-next-line react/no-unstable-nested-components
          (_, ref) => (
            <Resize
              aria-hidden
              className={styles.resize}
              ref={ref}
              theme={theme}
            />
          )
        ) : (
          <Fragment /> // eslint-disable-line react/jsx-no-useless-fragment
        )
      }
      height={height}
      minConstraints={[Math.max(minWidth, MIN_WIDTH), MIN_HEIGHT]}
      onResize={(_, { size: { height, width } }) => {
        resizeWindow({ height, id, width });
      }}
      width={width}>
      <div
        className={clsx(styles.root, {
          [styles.overflowHorizontal]: hasHorizontalOverflow,
          [styles.overflowVertical]: hasVerticalOverflow,
          [styles.scrollable]: scrollable,
        })}
        draggable={false}
        ref={rootRef}
        style={
          scrollable
            ? {
                height: height + scrollbarSize,
                width: width + scrollbarSize,
              }
            : {
                height,
                width,
              }
        }>
        <div
          ref={contentRef}
          style={
            scrollable
              ? undefined
              : {
                  height,
                  width,
                }
          }>
          {children}
        </div>
      </div>
    </Resizable>
  );
};

Content.displayName = "Content";
