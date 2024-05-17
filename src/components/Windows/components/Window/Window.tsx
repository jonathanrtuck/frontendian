import clsx from "clsx";
import {
  FunctionComponent,
  useContext,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import Draggable, { ControlPosition, DraggableBounds } from "react-draggable";
import { Resizable } from "react-resizable";

import { Menubar, Menubaritem } from "components/Menubar";
import { MenubarContext, StateContext } from "contexts";
import { Resize } from "icons";
import {
  Application,
  ApplicationComponentRef,
  File,
  Window as WindowType,
} from "types";

import styles from "./Window.module.css";

const MIN_WINDOW_HEIGHT = 100;
const MIN_WINDOW_WIDTH = 100;

// @see https://github.com/react-grid-layout/react-draggable/issues/749#issuecomment-2098538949
// @todo add prop(s) for menubar/toolbar (header)
// @todo listen for root element's `font-size` changes
// @todo pass a ref down to Component and use it for focusing instead of Window itself
export const Window: FunctionComponent<{
  Component: Application["Component"];
  stackingIndex: number;
  window: WindowType;
}> = ({ Component, stackingIndex, window }) => {
  const [state, dispatch] = useContext(StateContext);

  const applicationFocusRef = useRef<ApplicationComponentRef>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLElement>(null);
  const menubarRef = useRef<HTMLElement>(null);
  const rootRef = useRef<HTMLElement>(null);

  const [currentOuterWidth, setCurrentOuterWidth] = useState<number>(0);
  const [headerWidth, setHeaderWidth] = useState<number>(0);
  const [menubarWidth, setMenubarWidth] = useState<number>(0);
  const [menuitems, setMenuitems] = useState<Menubaritem[]>([]);
  const [windowChromeSize, setWindowChromeSize] = useState<number>(0);

  const hasMenubar = menuitems.length !== 0;

  const file = useMemo<File | undefined>(
    () =>
      window.fileId
        ? state.files.find(({ id }) => id === window.fileId)
        : undefined,
    [state.files, window.fileId]
  );
  const headerBounds = useMemo<DraggableBounds>(
    () => ({
      left: 0,
      right: currentOuterWidth - headerWidth,
    }),
    [currentOuterWidth, headerWidth]
  );
  const headerPosition = useMemo<ControlPosition>(
    () => ({
      x: Math.max(Math.min(window.headerX, currentOuterWidth - headerWidth), 0),
      y: 0,
    }),
    [currentOuterWidth, headerWidth, window.headerX]
  );
  const outerHeight = useMemo<number>(
    () => window.height + windowChromeSize,
    [window.height, windowChromeSize]
  );
  const outerWidth = useMemo<number>(
    () => window.width + windowChromeSize,
    [window.width, windowChromeSize]
  );

  useEffect(() => {
    if (
      window.focused &&
      rootRef.current &&
      !rootRef.current.contains(document.activeElement)
    ) {
      if (applicationFocusRef.current?.focus) {
        applicationFocusRef.current.focus();
      } else {
        rootRef.current.focus();
      }
    }
  }, [window.focused]);

  useEffect(() => {
    if (hasMenubar && contentRef.current && menubarRef.current) {
      const { borderLeftWidth, borderRightWidth } = getComputedStyle(
        contentRef.current
      );
      const bordersWidth =
        parseInt(borderLeftWidth, 10) + parseInt(borderRightWidth, 10);
      const scrollbarWidth =
        contentRef.current.offsetWidth -
        contentRef.current.clientWidth -
        bordersWidth;

      setMenubarWidth(
        menubarRef.current.offsetWidth + windowChromeSize - scrollbarWidth
      );

      // @todo if window is already smaller than this width, dispatch a resize
    }
  }, [hasMenubar, windowChromeSize]);

  useLayoutEffect(() => {
    if (rootRef.current && contentRef.current) {
      setWindowChromeSize(
        rootRef.current.offsetWidth - contentRef.current.clientWidth
      );
    }
  }, []);

  useLayoutEffect(() => {
    setCurrentOuterWidth(
      window.zoomed
        ? rootRef.current?.getBoundingClientRect().width ?? 0
        : outerWidth
    );
  }, [outerWidth, window.zoomed]);

  return (
    <Draggable
      cancel={`.${styles.nondraggable}`}
      defaultClassName={styles.draggable}
      defaultClassNameDragged={styles.dragged}
      defaultClassNameDragging={styles.dragging}
      disabled={window.zoomed}
      nodeRef={rootRef}
      onStart={({ shiftKey }) => {
        if (shiftKey) {
          return false;
        }
      }}
      onStop={(_, { x, y }) => {
        dispatch({
          payload: {
            ids: [window.id],
            type: "window",
            x,
            y,
          },
          type: "MOVE",
        });
      }}
      position={{
        x: window.x,
        y: window.y,
      }}>
      <Resizable
        handle={
          <Resize
            aria-hidden
            className={clsx(styles.nondraggable, styles.resizeHandle)}
            role="presentation"
          />
        }
        height={outerHeight}
        minConstraints={[
          Math.max(MIN_WINDOW_WIDTH, menubarWidth),
          MIN_WINDOW_HEIGHT,
        ]}
        onResize={(_, { size }) => {
          setHeaderWidth(headerRef.current?.getBoundingClientRect().width ?? 0);
          dispatch({
            payload: {
              height: size.height - windowChromeSize,
              ids: [window.id],
              width: size.width - windowChromeSize,
            },
            type: "RESIZE",
          });
        }}
        width={outerWidth}>
        <section
          className={clsx(styles.root, {
            [styles.zoomed]: window.zoomed,
          })}
          hidden={window.hidden}
          onBlur={({ relatedTarget }) => {
            if (!rootRef.current?.contains(relatedTarget)) {
              dispatch({
                payload: {
                  ids: [window.id],
                },
                type: "BLUR",
              });
            }
          }}
          onFocus={({ relatedTarget }) => {
            if (!relatedTarget || !rootRef.current?.contains(relatedTarget)) {
              dispatch({
                payload: {
                  ids: [window.id],
                },
                type: "FOCUS",
              });
            }
          }}
          role="dialog"
          ref={rootRef}
          style={{
            zIndex: stackingIndex,
          }}
          tabIndex={-1}>
          <Draggable
            axis="x"
            bounds={headerBounds}
            nodeRef={headerRef}
            onStart={({ shiftKey }) => {
              if (shiftKey) {
                setHeaderWidth(
                  headerRef.current?.getBoundingClientRect().width ?? 0
                );
              } else {
                return false;
              }
            }}
            onStop={(_, { x }) => {
              dispatch({
                payload: {
                  ids: [window.id],
                  type: "header",
                  x,
                },
                type: "MOVE",
              });
            }}
            position={headerPosition}>
            <header
              className={styles.header}
              onDoubleClick={(e) => {
                const isButton = (e.target as HTMLElement)?.classList.contains(
                  styles.button
                );

                if (!isButton) {
                  dispatch({
                    payload: {
                      ids: [window.id],
                    },
                    type: "HIDE",
                  });
                }
              }}
              ref={headerRef}>
              <h1 className={styles.title} title={window.title}>
                {window.title}
              </h1>
              <button
                aria-label="Close"
                className={clsx(
                  styles.nondraggable,
                  styles.button,
                  styles.close
                )}
                onClick={() => {
                  dispatch({
                    payload: {
                      ids: [window.id],
                    },
                    type: "CLOSE",
                  });
                }}
                title="Close"
                type="button"
              />
              <button
                aria-label="Zoom"
                className={clsx(
                  styles.nondraggable,
                  styles.button,
                  styles.zoom
                )}
                onClick={() => {
                  dispatch({
                    payload: {
                      ids: [window.id],
                    },
                    type: window.zoomed ? "UNZOOM" : "ZOOM",
                  });
                }}
                title="Zoom"
                type="button"
              />
            </header>
          </Draggable>
          {hasMenubar && (
            <nav className={clsx(styles.nondraggable, styles.nav)}>
              <Menubar
                className={styles.menubar}
                items={menuitems}
                ref={menubarRef}
              />
            </nav>
          )}
          <div
            className={clsx(
              styles.nondraggable,
              styles.content,
              styles.scrollbar
            )}
            ref={contentRef}
            style={
              window.zoomed
                ? undefined
                : {
                    height: `calc(${window.height}px + var(--window_scrollbar-size))`,
                    width: `calc(${window.width}px + var(--window_scrollbar-size))`,
                  }
            }>
            <MenubarContext.Provider value={setMenuitems}>
              <Component
                file={file}
                onClose={() => {
                  dispatch({
                    payload: {
                      ids: [window.id],
                    },
                    type: "CLOSE",
                  });
                }}
                ref={applicationFocusRef}
                window={window}
              />
            </MenubarContext.Provider>
          </div>
        </section>
      </Resizable>
    </Draggable>
  );
};
