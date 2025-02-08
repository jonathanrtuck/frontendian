"use client";

import { WindowContext } from "@/contexts";
import { useComputedCustomProperty } from "@/hooks";
import { Resize } from "@/icons";
import { useStore } from "@/store";
import clsx from "clsx";
import type { FunctionComponent, PropsWithChildren } from "react";
import { useContext, useLayoutEffect, useRef, useState } from "react";
import * as styles from "./WindowContent.css";

const MIN_HEIGHT = 16 * 7; // 7rem
const MIN_WIDTH = 16 * 10; // 10rem

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
  const scrollbarSize = useComputedCustomProperty(
    rootRef.current,
    "--scrollbar-size"
  );
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

      return () => resizeObserver.unobserve(contentElement);
    }
  }, [children, height, width]);

  return (
    <div
      className={clsx(styles.root[currentThemeId], {
        [styles.overflowHorizontal[currentThemeId]]: hasHorizontalOverflow,
        [styles.overflowVertical[currentThemeId]]: hasVerticalOverflow,
        [styles.scrollable[currentThemeId]]: scrollable,
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
  );
};

WindowContent.displayName = "WindowContent";
