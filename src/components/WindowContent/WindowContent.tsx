"use client";

import "./WindowContent.theme-beos.css";
import "./WindowContent.theme-mac-os-classic.css";
import { WindowContext } from "@/contexts";
import { Resize } from "@/icons";
import { useStore } from "@/store";
import clsx from "clsx";
import type { FunctionComponent, PropsWithChildren } from "react";
import { useContext, useLayoutEffect, useRef, useState } from "react";
import { Resizable } from "react-resizable";

const MIN_HEIGHT = 16 * 7; // 7rem
const MIN_WIDTH = 16 * 10; // 10rem

export const WindowContent: FunctionComponent<PropsWithChildren> = ({
  children,
}) => {
  const currentThemeId = useStore((store) => store.currentThemeId);
  const resizeWindow = useStore((store) => store.resizeWindow);
  const {
    collapsed,
    height,
    id,
    menubarRef,
    resizable,
    scrollable,
    width,
    zoomed,
  } = useContext(WindowContext);
  const contentRef = useRef<HTMLDivElement>(null);
  const rootRef = useRef<HTMLDivElement>(null);
  const [hasHorizontalOverflow, setHasHorizontalOverflow] =
    useState<boolean>(false);
  const [hasVerticalOverflow, setHasVerticalOverflow] =
    useState<boolean>(false);
  const [scrollbarWidth, setScrollbarWidth] = useState<number>(0);
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
      setScrollbarWidth((prevState) => {
        const value =
          getComputedStyle(rootElement).getPropertyValue("--scrollbar-width");

        if (!value) {
          return prevState;
        }

        const fontSize = parseInt(
          getComputedStyle(document.documentElement).fontSize,
          10
        );

        // handle other css units as needed (e.g. `%`, `em`, `vw`, etc…)
        if (value.endsWith("rem")) {
          return parseFloat(value) * fontSize;
        }

        // px values
        return parseFloat(value);
      });

      return () => resizeObserver.unobserve(contentElement);
    }
  }, [children, currentThemeId, height, width]);

  return (
    <Resizable
      axis="both"
      handle={
        // @see https://github.com/react-grid-layout/react-resizable?tab=readme-ov-file#custom-function
        resizable && !collapsed
          ? // eslint-disable-next-line react/no-unstable-nested-components
            (_, ref) => (
              <Resize aria-hidden ref={ref} themeId={currentThemeId} />
            )
          : null
      }
      height={height}
      minConstraints={[Math.max(minWidth, MIN_WIDTH), MIN_HEIGHT]}
      onResize={(_, { size: { height, width } }) => {
        resizeWindow({ height, id, width });
      }}
      onResizeStart={() => {
        if (zoomed && rootRef.current) {
          resizeWindow({
            height: rootRef.current.scrollHeight,
            id,
            width: rootRef.current.scrollWidth,
          });
        }
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
