import Draggable from "react-draggable";
import { FunctionComponent, useContext, useRef, useState } from "react";

import { WindowContext } from "@/contexts";
import { useComputedCustomProperty, useElementDimensions } from "@/hooks";
import {
  closeWindow,
  hideWindow,
  moveWindowTitlebar,
  showWindow,
  useStore,
  zoomWindow,
} from "@/store";
import { getTargetElement } from "@/utils";

export type TitlebarProps = {
  maxWidth: number;
};

export const Titlebar: FunctionComponent<TitlebarProps> = ({ maxWidth }) => {
  const theme = useStore((state) => state.theme);

  const { focused, hidden, id, scrollable, title, titlebarLeft } =
    useContext(WindowContext);

  const rootRef = useRef<HTMLElement>(null);
  const touchRef = useRef<number>(0);

  const [isDragging, setIsDragging] = useState<boolean>(false);

  const offset = useComputedCustomProperty("--window-padding");
  const { width: rootWidth } = useElementDimensions(rootRef, [maxWidth, title]);

  return (
    <Draggable
      axis="x"
      bounds="parent"
      cancel="button"
      nodeRef={rootRef}
      onStart={(e) => {
        if (!e.shiftKey) {
          return false;
        }

        setIsDragging(true);
      }}
      onStop={(_, { x }) => {
        setIsDragging(false);

        if (x - offset !== titlebarLeft) {
          moveWindowTitlebar({ id, left: x - offset });
        }
      }}
      position={
        theme.components.titlebar.draggable
          ? {
              x: Math.min(titlebarLeft + offset, maxWidth - rootWidth + offset),
              y: 0,
            }
          : undefined
      }>
      <header
        aria-grabbed={isDragging}
        className="titlebar"
        onDoubleClick={
          theme.components.titlebar.doubleClick
            ? (e) => {
                const targetElement = getTargetElement(e);
                const isButton = targetElement?.matches("button");

                if (!isButton) {
                  hideWindow({ id });
                }
              }
            : undefined
        }
        onPointerUp={
          theme.components.titlebar.doubleClick
            ? (e) => {
                const now = Date.now();
                const targetElement = getTargetElement(e);
                const isButton = targetElement?.matches("button");

                if (!isButton) {
                  const isDoubleClick = now - touchRef.current < 500;

                  if (isDoubleClick) {
                    hideWindow({ id });
                  }

                  touchRef.current = now;
                }
              }
            : undefined
        }
        ref={rootRef}>
        <h1 id={`${id}-title`} role="heading" title={title}>
          {title}
        </h1>
        <button
          aria-label="Close"
          aria-roledescription="close button"
          draggable={false}
          onClick={() => {
            closeWindow({ id });
          }}
          role="button"
          title="Close"
          type="button"
        />
        {Boolean(scrollable) && (
          <button
            aria-label="Zoom"
            aria-roledescription="zoom button"
            draggable={false}
            onClick={() => {
              zoomWindow({ id });
            }}
            role="button"
            title="Zoom"
            type="button"
          />
        )}
        {Boolean(theme.components.titlebar.collapsible) && (
          <button
            aria-label="Collapse"
            aria-roledescription="collapse button"
            draggable={false}
            onClick={() => {
              hidden ? showWindow({ id }) : hideWindow({ id });
            }}
            role="button"
            title="Collapse"
            type="button"
          />
        )}
      </header>
    </Draggable>
  );
};

Titlebar.displayName = "Titlebar";
