import clsx from "clsx";
import Draggable from "react-draggable";
import {
  FunctionComponent,
  useCallback,
  useContext,
  useLayoutEffect,
  useRef,
  useState,
} from "react";

import { WindowContext } from "@/contexts";
import { useStore, useStyles } from "@/hooks";
import {
  closeWindow,
  collapseWindow,
  expandWindow,
  hideWindow,
  moveWindowTitlebar,
  zoomWindow,
} from "@/store";
import { ComponentName, MS, Pixels } from "@/types";
import { getTargetElement } from "@/utils";

const COMPONENT_NAME: ComponentName = "Titlebar";

export const Titlebar: FunctionComponent = () => {
  const applications = useStore((state) => state.applications);
  const theme = useStore((state) => state.theme);
  const styles = useStyles(COMPONENT_NAME);

  const { collapsed, id, resizable, scrollable, title, titlebarLeft, width } =
    useContext(WindowContext);

  const rootRef = useRef<HTMLElement>(null);
  const touchRef = useRef<MS>(0);

  const [x, setX] = useState<Pixels>(0);

  const application = applications.find(({ windowIds }) =>
    windowIds.includes(id)
  )!;
  const hasIcon = theme.id === "theme-mac-os-classic";
  const isCollapsible = theme.id === "theme-mac-os-classic";
  const isDoubleClickable = theme.id === "theme-beos";
  const isDraggable = theme.id === "theme-beos";

  const getMaxLeft = useCallback(
    () =>
      (rootRef.current
        ?.closest<HTMLElement>("[aria-current]")
        ?.getBoundingClientRect().width ?? 0) -
      (rootRef.current?.getBoundingClientRect().width ?? 0),
    []
  );
  const updatePosition = useCallback(() => {
    setX(Math.max(0, titlebarLeft * getMaxLeft()));
  }, [getMaxLeft, titlebarLeft]);

  useLayoutEffect(updatePosition, [
    resizable,
    scrollable,
    theme,
    title,
    updatePosition,
    width,
  ]);

  return (
    <Draggable
      axis="x"
      bounds="parent"
      cancel={`.${styles.button}`}
      nodeRef={rootRef}
      onStart={(e) => {
        if (!e.shiftKey) {
          return false;
        }
      }}
      onStop={(_, { x }) => {
        const maxLeft = getMaxLeft();
        const left = Math.max(0, Math.min(maxLeft <= 0 ? 0 : x / maxLeft, 1));

        if (left !== titlebarLeft) {
          moveWindowTitlebar({ id, left });
        }
      }}
      position={
        isDraggable
          ? {
              x,
              y: 0,
            }
          : undefined
      }>
      <header
        className={styles.root}
        onDoubleClick={
          isDoubleClickable
            ? (e) => {
                const targetElement = getTargetElement(e);
                const isButton = targetElement?.classList.contains(
                  styles.button
                );

                if (!isButton) {
                  hideWindow({ id });
                }
              }
            : undefined
        }
        onPointerUp={
          isDoubleClickable
            ? (e) => {
                const now = Date.now();
                const targetElement = getTargetElement(e);
                const isButton = targetElement?.classList.contains(
                  styles.button
                );

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
        {hasIcon && application.Icon !== undefined ? (
          <application.Icon aria-hidden className={styles.icon} />
        ) : null}
        <h1 className={styles.title} id={`${id}-title`} title={title}>
          {title}
        </h1>
        <button
          aria-label="Close"
          className={clsx(styles.button, styles.close)}
          draggable={false}
          onClick={() => {
            closeWindow({ id });
          }}
          title="Close"
          type="button"
        />
        {Boolean(resizable) && (
          <button
            aria-label="Zoom"
            className={clsx(styles.button, styles.zoom)}
            draggable={false}
            onClick={() => {
              zoomWindow({ id });
            }}
            title="Zoom"
            type="button"
          />
        )}
        {isCollapsible ? (
          <button
            aria-label="Collapse"
            className={clsx(styles.button, styles.collapse)}
            draggable={false}
            onClick={() => {
              collapsed ? expandWindow({ id }) : collapseWindow({ id });
            }}
            title="Collapse"
            type="button"
          />
        ) : null}
      </header>
    </Draggable>
  );
};

Titlebar.displayName = COMPONENT_NAME;
