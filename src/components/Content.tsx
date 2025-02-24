"use client";

import { useOverflow } from "@/hooks";
import clsx from "clsx";
import type { FunctionComponent, PropsWithChildren } from "react";
import { useRef } from "react";

export const Content: FunctionComponent<
  PropsWithChildren<{
    scrollable?: boolean;
  }>
> = ({ children, scrollable = false }) => {
  const contentRef = useRef<HTMLDivElement>(null);
  const [isHorizontal, isVertical] = useOverflow(contentRef);

  if (scrollable) {
    return (
      <div
        className={clsx("content", "isScrollable", {
          isHorizontal,
          isVertical,
        })}
        draggable={false}>
        <div ref={contentRef}>{children}</div>
      </div>
    );
  }

  return (
    <div className="content" draggable={false}>
      {children}
    </div>
  );
};

Content.displayName = "Content";
