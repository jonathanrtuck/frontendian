import clsx from "clsx";
import {
  CSSProperties,
  FunctionComponent,
  HTMLAttributes,
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
import { getInteractionPosition, setStyles } from "utils";

import styles from "./Window.module.css";

const DEFAULT_SCROLLBAR_SIZE = 16 * 1; // 1rem
const MIN_WINDOW_HEIGHT = 16 * 7; // 7rem
const MIN_WINDOW_WIDTH = 16 * 7; // 7rem

// @todo attach event listeners to document in `onDragStart`/`onResizeStart` and remove in `onDragEnd`/`onResizeEnd` (use refs for keeping handles to attached callbacks)
// @todo listen for root element's `font-size` changes
export const Window: FunctionComponent<
  WindowType & {
    Component: Application["Component"];
  } & HTMLAttributes<HTMLElement>
> = ({
  Component,
  fileId,
  fixedSize,
  focused,
  headerX,
  height,
  hidden,
  id,
  style,
  title,
  width,
  x,
  y,
  zoomed,
}) => {
  const [state, dispatch] = useContext(StateContext);

  // elements
  const applicationFocusRef = useRef<ApplicationComponentRef>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLElement>(null);
  const menubarRef = useRef<HTMLElement>(null);
  const resizeHandleRef = useRef<SVGSVGElement>(null);
  const rootRef = useRef<HTMLElement>(null);

  // values
  const draggingFromRef = useRef<
    [clientX: number, clientY: number] | undefined
  >(undefined);
  const draggingHeaderFromRef = useRef<number | undefined>(undefined);
  const heightRef = useRef<number>(height);
  const headerLeftRef = useRef<number>(headerX);
  const leftRef = useRef<number>(x);
  const resizingFromRef = useRef<
    [clientX: number, clientY: number] | undefined
  >(undefined);
  const topRef = useRef<number>(y);
  const touchRef = useRef<number>(0);
  const widthRef = useRef<number>(width);

  const [menuitems, setMenuitems] = useState<Menubaritem[]>([]);

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
  const scrollbarSize = useMemo<number>(
    () => (fixedSize ? 0 : DEFAULT_SCROLLBAR_SIZE),
    [fixedSize]
  );

  const onDragMove = useCallback(
    (e: MouseEvent | TouchEvent) => {
      const headerElement = headerRef.current;
      const rootElement = rootRef.current;

      if (draggingFromRef.current !== undefined && rootElement) {
        const [clientX, clientY] = getInteractionPosition(e);
        const [fromX, fromY] = draggingFromRef.current;

        leftRef.current = x + (clientX - fromX);
        topRef.current = y + (clientY - fromY);

        rootElement.style.left = `${leftRef.current}px`;
        rootElement.style.top = `${topRef.current}px`;
      }

      if (
        draggingHeaderFromRef.current !== undefined &&
        rootElement &&
        headerElement
      ) {
        const [clientX] = getInteractionPosition(e);
        const offset = clientX - draggingHeaderFromRef.current;
        const maxX = rootElement.offsetWidth - headerElement.offsetWidth;

        if (headerElement.style.left === "auto") {
          headerLeftRef.current = Math.max(maxX + offset, 0);
        } else {
          headerLeftRef.current = Math.min(
            Math.max(Math.min(headerX, maxX) + offset, 0),
            maxX
          );
        }

        headerElement.style.left = `${headerLeftRef.current}px`;
        headerElement.style.right = "auto";
      }
    },
    [headerX, x, y]
  );
  const onDragEnd = useCallback(() => {
    if (draggingFromRef.current !== undefined) {
      draggingFromRef.current = undefined;
      document.body.style.userSelect = "";

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
      document.body.style.userSelect = "";

      dispatch({
        payload: {
          ids: [id],
          type: "header",
          x: headerLeftRef.current,
        },
        type: "MOVE",
      });
    }
  }, [dispatch, id]);
  const onDragStart = useCallback(
    (e: MouseEvent | TouchEvent) => {
      const [clientX, clientY] = getInteractionPosition(e);
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
        draggingHeaderFromRef.current = clientX;
      } else {
        if (zoomed || draggingFromRef.current !== undefined) {
          return;
        }

        document.body.style.userSelect = "none";
        draggingFromRef.current = [clientX, clientY];
      }
    },
    [zoomed]
  );
  const onResizeMove = useCallback(
    (e: MouseEvent | TouchEvent) => {
      const contentElement = contentRef.current;
      const headerElement = headerRef.current;
      const menubarElement = menubarRef.current;
      const rootElement = rootRef.current;

      if (
        resizingFromRef.current &&
        contentElement &&
        headerElement &&
        menubarElement &&
        rootElement
      ) {
        const [clientX, clientY] = getInteractionPosition(e);
        const [fromX, fromY] = resizingFromRef.current;
        const isHeaderOverflowing =
          headerX + headerElement.offsetWidth >
          widthRef.current +
            rootElement.offsetWidth -
            contentElement.clientWidth;

        heightRef.current = Math.max(
          MIN_WINDOW_HEIGHT,
          height + (clientY - fromY)
        );
        widthRef.current = Math.max(
          Math.max(MIN_WINDOW_WIDTH, width + (clientX - fromX)),
          menubarElement.offsetWidth +
            rootElement.offsetWidth -
            contentElement.clientWidth -
            scrollbarSize
        );
        contentElement.style.height = `${heightRef.current + scrollbarSize}px`;
        contentElement.style.width = `${widthRef.current + scrollbarSize}px`;
        headerElement.style.left = isHeaderOverflowing
          ? "auto"
          : `${headerLeftRef.current}px`;
        headerElement.style.right = isHeaderOverflowing ? "0" : "auto";
      }
    },
    [headerX, height, scrollbarSize, width]
  );
  const onResizeEnd = useCallback(() => {
    if (resizingFromRef.current) {
      resizingFromRef.current = undefined;
      document.body.style.userSelect = "";

      dispatch({
        payload: {
          height: heightRef.current,
          ids: [id],
          width: widthRef.current,
        },
        type: "RESIZE",
      });
    }
  }, [dispatch, id]);
  const onResizeStart = useCallback(
    (e: MouseEvent | TouchEvent) => {
      if (!resizingFromRef.current && !zoomed) {
        const [clientX, clientY] = getInteractionPosition(e);

        if (e.type === "touchstart") {
          e.preventDefault();
        }

        document.body.style.userSelect = "none";
        resizingFromRef.current = [clientX, clientY];
      }
    },
    [zoomed]
  );

  // these are passed down to the application component
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

  useEffect(() => {
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
  }, [onDragStart]);

  useEffect(() => {
    document.addEventListener("mousemove", onDragMove);
    document.addEventListener("touchmove", onDragMove);

    return () => {
      document.removeEventListener("mousemove", onDragMove);
      document.removeEventListener("touchmove", onDragMove);
    };
  }, [onDragMove]);

  useEffect(() => {
    const rootElement = rootRef.current;

    document.addEventListener("mouseup", onDragEnd);

    if (rootElement) {
      rootElement.addEventListener("touchend", onDragEnd);

      return () => {
        document.removeEventListener("mouseup", onDragEnd);
        rootElement.removeEventListener("touchend", onDragEnd);
      };
    }

    return () => {
      document.removeEventListener("mouseup", onDragEnd);
    };
  }, [onDragEnd]);

  useEffect(() => {
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
  }, [fixedSize, onResizeStart]);

  useEffect(() => {
    document.addEventListener("mousemove", onResizeMove);
    document.addEventListener("touchmove", onResizeMove);

    return () => {
      document.removeEventListener("mousemove", onResizeMove);
      document.removeEventListener("touchmove", onResizeMove);
    };
  }, [onResizeMove]);

  useEffect(() => {
    const rootElement = rootRef.current;

    document.addEventListener("mouseup", onResizeEnd);

    if (rootElement) {
      rootElement.addEventListener("touchend", onResizeEnd);

      return () => {
        document.removeEventListener("mouseup", onResizeEnd);
        rootElement.removeEventListener("touchend", onResizeEnd);
      };
    }

    return () => {
      document.removeEventListener("mouseup", onResizeEnd);
    };
  }, [onResizeEnd]);

  useLayoutEffect(() => {
    setStyles(document.body, {
      "--window_scrollbar-size": `${DEFAULT_SCROLLBAR_SIZE}px`,
    } as CSSProperties);
  }, []);

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
    const rootElement = rootRef.current;

    leftRef.current = x;
    topRef.current = y;

    if (rootElement) {
      rootElement.style.left = `${x}px`;
      rootElement.style.top = `${y}px`;
    }
  }, [x, y]);

  useLayoutEffect(() => {
    if (rootRef.current && headerRef.current && contentRef.current) {
      const nextOuterWidth =
        widthRef.current +
        scrollbarSize +
        rootRef.current.offsetWidth -
        contentRef.current.clientWidth;
      const isHeaderOverflowing =
        headerLeftRef.current + headerRef.current.offsetWidth > nextOuterWidth;

      if (!zoomed) {
        headerRef.current.style.left = isHeaderOverflowing
          ? "auto"
          : `${headerLeftRef.current}px`;
        headerRef.current.style.right = isHeaderOverflowing ? "0" : "auto";
      }
    }
  }, [scrollbarSize, zoomed]);

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
      style={style}
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
      {menuitems.length !== 0 && (
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
