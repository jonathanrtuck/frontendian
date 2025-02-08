"use client";

import "./WindowContent.theme-beos.css";
import { WindowContext } from "@/contexts";
import { useComputedCustomProperty } from "@/hooks";
import { Resize } from "@/icons";
import { useStore } from "@/store";
import clsx from "clsx";
import type { FunctionComponent, PropsWithChildren } from "react";
import { Fragment, useContext, useLayoutEffect, useRef, useState } from "react";
import { Resizable } from "react-resizable";

const MIN_HEIGHT = 16 * 7; // 7rem
const MIN_WIDTH = 16 * 10; // 10rem

// @todo Resizable
export const WindowContent: FunctionComponent<PropsWithChildren> = ({
  children,
}) => {
  const currentThemeId = useStore((store) => store.currentThemeId);
  const resizeWindow = useStore((store) => store.resizeWindow);
  const themes = useStore((store) => store.themes);
  const { collapsed, height, id, menubarRef, resizable, scrollable, width } =
    useContext(WindowContext);
  const contentRef = useRef<HTMLDivElement>(null);
  const rootRef = useRef<HTMLDivElement>(null);
  const [hasHorizontalOverflow, setHasHorizontalOverflow] =
    useState<boolean>(false);
  const [hasVerticalOverflow, setHasVerticalOverflow] =
    useState<boolean>(false);
  const scrollbarWidth = useComputedCustomProperty(
    rootRef.current,
    "--scrollbar-width"
  );
  const minWidth = menubarRef.current
    ? Array.from(menubarRef.current.children)
        .map((element) => (element as HTMLElement).offsetWidth)
        .reduce((acc, width) => acc + width, 0)
    : 0;
  const theme = themes.find(({ id }) => id === currentThemeId)!;

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

      return () => resizeObserver.unobserve(contentElement);
    }
  }, [children, height, width]);

  return (
    <Resizable
      axis="both"
      handle={
        // @see https://github.com/react-grid-layout/react-resizable?tab=readme-ov-file#custom-function
        resizable && !collapsed ? (
          // eslint-disable-next-line react/no-unstable-nested-components
          (_, ref) => <Resize aria-hidden ref={ref} theme={theme} />
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
        className="component-window-content"
        data-overflow={clsx({
          horizontal: hasHorizontalOverflow,
          vertical: hasVerticalOverflow,
        })}
        data-scrollable={scrollable}
        draggable={false}
        ref={rootRef}
        style={
          scrollable
            ? {
                height: height + scrollbarWidth,
                width: width + scrollbarWidth,
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

WindowContent.displayName = "WindowContent";
