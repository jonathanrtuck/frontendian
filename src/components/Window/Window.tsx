import clsx from "clsx";
import {
  FunctionComponent,
  useCallback,
  useContext,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import { Menubar, MenubarContext, Menubaritem } from "components/Menubar";
import { Resize } from "icons";
import {
  Application,
  ApplicationComponentRef,
  File,
  StateContext,
  Window as WindowType,
} from "state";
import { ID } from "types";

import styles from "./Window.module.css";

const MIN_WINDOW_HEIGHT = 100;
const MIN_WINDOW_WIDTH = 100;

// @todo listen for root element's `font-size` changes
export const Window: FunctionComponent<
  WindowType & {
    Component: Application["Component"];
    stackingIndex: number;
  }
> = ({
  Component,
  fileId,
  fixedSize,
  focused,
  headerX,
  height,
  hidden,
  id,
  stackingIndex,
  title,
  width,
  x,
  y,
  zoomed,
}) => {
  const [state, dispatch] = useContext(StateContext);

  const applicationFocusRef = useRef<ApplicationComponentRef>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const draggingFromRef = useRef<[x: number, y: number] | undefined>(undefined);
  const draggingHeaderFromRef = useRef<number | undefined>(undefined);
  const heightRef = useRef<number>(height);
  const headerLeftRef = useRef<number>(headerX);
  const headerRef = useRef<HTMLElement>(null);
  const leftRef = useRef<number>(x);
  const menubarRef = useRef<HTMLElement>(null);
  const resizeHandleRef = useRef<SVGSVGElement>(null);
  const resizingFromRef = useRef<[height: number, width: number] | undefined>(
    undefined
  );
  const rootRef = useRef<HTMLElement>(null);
  const topRef = useRef<number>(y);
  const touchRef = useRef<number>(0);
  const widthRef = useRef<number>(width);

  const [menuitems, setMenuitems] = useState<Menubaritem[]>([]);
  const [scrollbarSize, setScrollbarSize] = useState<number>(0);

  const hasMenubar = menuitems.length !== 0;

  const application = useMemo<Application>(
    () =>
      state.applications.find(({ windowIds }) =>
        windowIds.includes(id)
      ) as Application,
    [id, state.applications]
  );
  const file = useMemo<File | undefined>(
    () => (fileId ? state.files.find(({ id }) => id === fileId) : undefined),
    [fileId, state.files]
  );
  const openableFiles = useMemo<File[]>(
    () =>
      Object.entries(state.types)
        .filter(
          ([, { application: applicationId }]) =>
            applicationId === application.id
        )
        .reduce(
          (acc: File[], [type]) =>
            acc.concat(state.files.filter((file) => file.type === type)),
          []
        ),
    [application.id, state.files, state.types]
  );

  const onDragMove = useCallback(
    (e: MouseEvent | TouchEvent) => {
      if (draggingFromRef.current !== undefined && rootRef.current) {
        const [fromX, fromY] = draggingFromRef.current;
        const { screenX, screenY } = e as MouseEvent;

        leftRef.current = x + (screenX - fromX);
        topRef.current = y + (screenY - fromY);

        requestAnimationFrame(() => {
          if (rootRef.current) {
            rootRef.current.style.left = `${leftRef.current}px`;
            rootRef.current.style.top = `${topRef.current}px`;
          }
        });
      }

      if (
        draggingHeaderFromRef.current !== undefined &&
        rootRef.current &&
        headerRef.current
      ) {
        const { screenX } = e as MouseEvent;
        const offset = screenX - draggingHeaderFromRef.current;
        const maxX =
          rootRef.current.offsetWidth - headerRef.current.offsetWidth;

        if (headerRef.current.style.left === "auto") {
          headerLeftRef.current = Math.max(maxX + offset, 0);
        } else {
          headerLeftRef.current = Math.min(
            Math.max(Math.min(headerX, maxX) + offset, 0),
            maxX
          );
        }

        requestAnimationFrame(() => {
          if (headerRef.current) {
            headerRef.current.style.left = `${headerLeftRef.current}px`;
            headerRef.current.style.right = "auto";
          }
        });
      }
    },
    [headerX, x, y]
  );
  const onDragEnd = useCallback(
    (e: MouseEvent | TouchEvent) => {
      if (draggingFromRef.current !== undefined) {
        draggingFromRef.current = undefined;
        document.body.style.userSelect = "unset";

        document.removeEventListener("mousemove", onDragMove);
        document.removeEventListener("mouseup", onDragEnd);
        rootRef.current?.removeEventListener("touchend", onDragEnd);

        dispatch({
          payload: {
            ids: [id],
            type: "window",
            x: leftRef.current,
            y: topRef.current,
          },
          type: "MOVE",
        });
      }

      if (draggingHeaderFromRef.current !== undefined) {
        draggingHeaderFromRef.current = undefined;
        document.body.style.userSelect = "unset";

        document.removeEventListener("mousemove", onDragMove);
        document.removeEventListener("mouseup", onDragEnd);
        rootRef.current?.removeEventListener("touchend", onDragEnd);

        dispatch({
          payload: {
            ids: [id],
            type: "header",
            x: headerLeftRef.current,
          },
          type: "MOVE",
        });
      }
    },
    [dispatch, id, onDragMove]
  );
  const onDragStart = useCallback(
    (e: MouseEvent | TouchEvent) => {
      const { screenX, screenY } = e as MouseEvent;

      const isDraggable = !(e.target as HTMLElement).closest(
        `.${styles.nondraggable}`
      );

      if (!isDraggable) {
        return;
      }

      if (e.type === "touchstart") {
        e.preventDefault();
      }

      if (e.shiftKey) {
        if (draggingHeaderFromRef.current !== undefined) {
          return;
        }

        document.body.style.userSelect = "none";
        draggingHeaderFromRef.current = screenX;

        document.addEventListener("mousemove", onDragMove);
        document.addEventListener("mouseup", onDragEnd);
        rootRef.current?.addEventListener("touchend", onDragEnd);
      } else {
        if (zoomed || draggingFromRef.current !== undefined) {
          return;
        }

        document.body.style.userSelect = "none";
        draggingFromRef.current = [screenX, screenY];

        document.addEventListener("mousemove", onDragMove);
        document.addEventListener("mouseup", onDragEnd);
        rootRef.current?.addEventListener("touchend", onDragEnd);
      }
    },
    [onDragEnd, onDragMove, zoomed]
  );
  const onResizeMove = useCallback(
    (e: MouseEvent | TouchEvent) => {
      if (
        resizingFromRef.current &&
        rootRef.current &&
        menubarRef.current &&
        contentRef.current
      ) {
        const [fromX, fromY] = resizingFromRef.current;
        const { screenX, screenY } = e as MouseEvent;

        heightRef.current = Math.max(
          MIN_WINDOW_HEIGHT,
          height + (screenY - fromY)
        );
        widthRef.current = Math.max(
          Math.max(MIN_WINDOW_WIDTH, width + (screenX - fromX)),
          menubarRef.current.offsetWidth +
            rootRef.current.offsetWidth -
            contentRef.current.clientWidth -
            scrollbarSize
        );

        requestAnimationFrame(() => {
          if (contentRef.current) {
            contentRef.current.style.height = `${
              heightRef.current + scrollbarSize
            }px`;
            contentRef.current.style.width = `${
              widthRef.current + scrollbarSize
            }px`;
          }

          if (rootRef.current && headerRef.current && contentRef.current) {
            const nextOuterWidth =
              widthRef.current +
              rootRef.current.offsetWidth -
              contentRef.current.clientWidth;
            const isHeaderOverflowing =
              headerX + headerRef.current.offsetWidth > nextOuterWidth;

            headerRef.current.style.left = isHeaderOverflowing
              ? "auto"
              : `${headerLeftRef.current}px`;
            headerRef.current.style.right = isHeaderOverflowing ? "0" : "auto";
          }
        });
      }
    },
    [headerX, height, scrollbarSize, width]
  );
  const onResizeEnd = useCallback(() => {
    if (resizingFromRef.current) {
      resizingFromRef.current = undefined;
      document.body.style.userSelect = "unset";

      document.removeEventListener("mousemove", onResizeMove);
      document.removeEventListener("mouseup", onResizeEnd);
      rootRef.current?.removeEventListener("touchend", onResizeEnd);

      dispatch({
        payload: {
          height: heightRef.current,
          ids: [id],
          width: widthRef.current,
        },
        type: "RESIZE",
      });
    }
  }, [dispatch, id, onResizeMove]);
  const onResizeStart = useCallback(
    (e: MouseEvent | TouchEvent) => {
      if (!resizingFromRef.current && !zoomed) {
        const { screenX, screenY } = e as MouseEvent;

        if (e.type === "touchstart") {
          e.preventDefault();
        }

        document.addEventListener("mousemove", onResizeMove);
        document.addEventListener("mouseup", onResizeEnd);
        rootRef.current?.addEventListener("touchend", onResizeEnd);

        document.body.style.userSelect = "none";
        resizingFromRef.current = [screenX, screenY];
      }
    },
    [onResizeEnd, onResizeMove, zoomed]
  );

  const onClose = useCallback(() => {
    dispatch({
      payload: {
        ids: [id],
        type: "window",
      },
      type: "CLOSE",
    });
  }, [dispatch, id]);
  const onNew = useCallback(() => {
    dispatch({
      payload: {
        applicationId: application.id,
        type: "window",
      },
      type: "OPEN",
    });
  }, [application.id, dispatch]);
  const onOpen = useCallback(
    (fileId: ID) => {
      dispatch({
        payload: {
          ids: [fileId],
          type: "file",
          windowId: id,
        },
        type: "OPEN",
      });
    },
    [dispatch, id]
  );
  const onQuit = useCallback(() => {
    dispatch({
      payload: {
        ids: [application.id],
        type: "application",
      },
      type: "CLOSE",
    });
  }, [application.id, dispatch]);
  const onResize = useCallback(
    (height: number, width: number) => {
      dispatch({
        payload: {
          height,
          ids: [id],
          width,
        },
        type: "RESIZE",
      });
    },
    [dispatch, id]
  );

  useEffect(() => {
    if (
      focused &&
      rootRef.current &&
      !rootRef.current.contains(document.activeElement)
    ) {
      if (applicationFocusRef.current?.focus) {
        applicationFocusRef.current.focus();
      } else {
        rootRef.current.focus();
      }
    }
  }, [focused]);

  useLayoutEffect(() => {
    if (hasMenubar && contentRef.current && menubarRef.current) {
      const { borderLeftWidth, borderRightWidth } = getComputedStyle(
        contentRef.current
      );
      const bordersWidth =
        parseInt(borderLeftWidth, 10) + parseInt(borderRightWidth, 10);

      // @todo if window is already smaller than menubar width, call `onResize`
      setScrollbarSize(
        contentRef.current.offsetWidth -
          contentRef.current.clientWidth -
          bordersWidth
      );
    }
  }, [hasMenubar]);

  useLayoutEffect(() => {
    if (rootRef.current && headerRef.current && contentRef.current) {
      const nextOuterWidth =
        widthRef.current +
        scrollbarSize +
        rootRef.current.offsetWidth -
        contentRef.current.clientWidth;
      const isHeaderOverflowing =
        headerLeftRef.current + headerRef.current.offsetWidth > nextOuterWidth;

      headerRef.current.style.left =
        !zoomed && isHeaderOverflowing ? "auto" : `${headerLeftRef.current}px`;
      headerRef.current.style.right =
        !zoomed && isHeaderOverflowing ? "0" : "auto";
    }
  }, [scrollbarSize, zoomed]);

  useLayoutEffect(() => {
    leftRef.current = x;
    topRef.current = y;

    if (contentRef.current) {
      contentRef.current.style.height = zoomed
        ? "unset"
        : `${heightRef.current + scrollbarSize}px`;
      contentRef.current.style.width = zoomed
        ? "unset"
        : `${widthRef.current + scrollbarSize}px`;
    }
  }, [scrollbarSize, x, y, zoomed]);

  useLayoutEffect(() => {
    const rootElement = rootRef.current;

    if (rootElement) {
      rootElement.addEventListener("mousedown", onDragStart);
      rootElement.addEventListener("touchstart", onDragStart, {
        passive: false,
      });

      return () => {
        rootElement.removeEventListener("mousedown", onDragStart);
        rootElement.removeEventListener("touchstart", onDragStart);
      };
    }
  }, [onDragMove, onDragEnd, onDragStart]);

  useLayoutEffect(() => {
    heightRef.current = height;
    widthRef.current = width;

    if (contentRef.current && contentRef.current.style.height !== "unset") {
      contentRef.current.style.height = `${height + scrollbarSize}px`;
    }

    if (contentRef.current && contentRef.current.style.width !== "unset") {
      contentRef.current.style.width = `${width + scrollbarSize}px`;
    }

    if (rootRef.current && headerRef.current && contentRef.current) {
      const isHeaderOverflowing =
        headerLeftRef.current + headerRef.current.offsetWidth >
        width + rootRef.current.offsetWidth - contentRef.current.clientWidth;

      headerRef.current.style.left = isHeaderOverflowing
        ? "auto"
        : `${headerLeftRef.current}px`;
      headerRef.current.style.right = isHeaderOverflowing ? "0" : "auto";
    }
  }, [height, scrollbarSize, width]);

  useLayoutEffect(() => {
    const resizeHandleElement = resizeHandleRef.current;

    if (resizeHandleElement && !fixedSize) {
      resizeHandleElement.addEventListener("mousedown", onResizeStart);
      resizeHandleElement.addEventListener("touchstart", onResizeStart, {
        passive: false,
      });

      return () => {
        resizeHandleElement.removeEventListener("mousedown", onResizeStart);
        resizeHandleElement.removeEventListener("touchstart", onResizeStart);
      };
    }
  }, [fixedSize, onDragMove, onDragEnd, onDragStart, onResizeStart]);

  return (
    <section
      aria-labelledby={`${id}__title`}
      className={clsx(styles.root, {
        [styles.zoomed]: zoomed,
      })}
      hidden={hidden}
      onBlur={({ relatedTarget }) => {
        if (!rootRef.current?.contains(relatedTarget)) {
          dispatch({
            payload: {
              ids: [id],
            },
            type: "BLUR",
          });
        }
      }}
      onFocus={({ relatedTarget }) => {
        if (!relatedTarget || !rootRef.current?.contains(relatedTarget)) {
          dispatch({
            payload: {
              ids: [id],
            },
            type: "FOCUS",
          });
        }
      }}
      ref={rootRef}
      role="dialog"
      style={{
        left: zoomed ? 0 : x,
        top: zoomed ? 0 : y,
        zIndex: stackingIndex,
      }}
      tabIndex={0}>
      <header
        className={styles.header}
        onDoubleClick={(e) => {
          const isButton = (e.target as HTMLElement)?.classList.contains(
            styles.button
          );

          if (!isButton) {
            dispatch({
              payload: {
                ids: [id],
              },
              type: "HIDE",
            });
          }
        }}
        onPointerUp={(e) => {
          const now = Date.now();
          const isButton = (e.target as HTMLElement)?.classList.contains(
            styles.button
          );
          const isDoubleClick = now - touchRef.current < 500;

          if (isDoubleClick && !isButton) {
            dispatch({
              payload: {
                ids: [id],
              },
              type: "HIDE",
            });
          }

          touchRef.current = now;
        }}
        ref={headerRef}>
        <h1 className={styles.title} id={`${id}__title`} title={title}>
          {title}
        </h1>
        <button
          aria-label="Close"
          className={clsx(styles.nondraggable, styles.button, styles.close)}
          onPointerUp={() => {
            if (draggingHeaderFromRef.current === undefined) {
              dispatch({
                payload: {
                  ids: [id],
                  type: "window",
                },
                type: "CLOSE",
              });
            }
          }}
          title="Close"
          type="button"
        />
        {!fixedSize && (
          <button
            aria-label="Zoom"
            className={clsx(styles.nondraggable, styles.button, styles.zoom)}
            onPointerUp={() => {
              if (draggingHeaderFromRef.current === undefined) {
                dispatch({
                  payload: {
                    ids: [id],
                  },
                  type: zoomed ? "UNZOOM" : "ZOOM",
                });
              }
            }}
            title="Zoom"
            type="button"
          />
        )}
      </header>
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
        className={clsx(styles.nondraggable, styles.content, {
          [styles.scrollbar]: !fixedSize,
        })}
        ref={contentRef}>
        <MenubarContext.Provider value={setMenuitems}>
          <Component
            application={application}
            file={file}
            onClose={onClose}
            onNew={onNew}
            onOpen={onOpen}
            onQuit={onQuit}
            onResize={onResize}
            openableFiles={openableFiles}
            ref={applicationFocusRef}
            windowId={id}
          />
        </MenubarContext.Provider>
      </div>
      {!fixedSize && (
        <Resize
          aria-hidden
          className={clsx(styles.nondraggable, styles.resizeHandle)}
          ref={resizeHandleRef}
          role="presentation"
        />
      )}
    </section>
  );
};
