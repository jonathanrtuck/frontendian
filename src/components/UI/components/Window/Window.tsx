import clsx from "clsx";
import {
  FunctionComponent,
  ReactNode,
  useCallback,
  useMemo,
  useRef,
  useState,
} from "react";
import Draggable from "react-draggable";

import { Dialog } from "@/components/Dialog";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { Menu, Menuitem } from "@/components/Menu";
import { WindowContext, WindowContextType } from "@/contexts";
import { useElementDimensions, useFocus } from "@/hooks";
import {
  activateWindow,
  blurWindow,
  closeApplication,
  closeWindow,
  focusWindow,
  inactivateWindow,
  moveWindow,
  openFile,
  openWindow,
  resizeWindow,
  useStore,
} from "@/store";
import { File, ID, Window as WindowType } from "@/types";

import { Content } from "./components/Content";
import { Menubar } from "./components/Menubar";
import { Titlebar } from "./components/Titlebar";

import styles from "./Window.module.css";

export type WindowProps = WindowType;

export const Window: FunctionComponent<WindowProps> = (props) => {
  const { fileId, focused, hidden, id, left, top, width, zoomed } = props;

  const applications = useStore((state) => state.applications);
  const files = useStore((state) => state.files);
  const stackingOrder = useStore((state) => state.stackingOrder);
  const types = useStore((state) => state.types);

  const menubarRef = useRef<HTMLMenuElement>(null);
  const rootRef = useRef<HTMLElement>(null);

  const [aboutDialogContent, setAboutDialogContent] = useState<ReactNode>(null);
  const [isDragging, setIsDragging] = useState<boolean>(false);

  useFocus({
    deps: [focused],
    ref: rootRef,
  });

  const { width: rootWidth } = useElementDimensions(rootRef, [width, zoomed]);

  const application = applications.find(({ windowIds }) =>
    windowIds.includes(id)
  )!;
  const file = fileId ? files.find(({ id }) => id === fileId) : undefined;
  const openableFiles = Object.entries(types)
    .filter(
      ([, { application: applicationId }]) => applicationId === application.id
    )
    .reduce(
      (acc: File[], [type]) =>
        acc.concat(files.filter((file) => file.type === type)),
      []
    );

  const contextValue = useMemo<WindowContextType>(
    () => ({
      ...props,
      menubarRef,
    }),
    [props]
  );

  const onAbout = useCallback(
    (node: ReactNode) => {
      setAboutDialogContent(node);
      inactivateWindow({ id });
    },
    [id]
  );
  const onClose = useCallback(() => {
    closeWindow({ id });
  }, [id]);
  const onNew = useCallback(() => {
    openWindow({ id: application.id });
  }, [application.id]);
  const onOpen = useCallback(
    (fileId: ID) => {
      openFile({
        id: fileId,
        windowId: id,
      });
    },
    [id]
  );
  const onQuit = useCallback(() => {
    closeApplication({ id: application.id });
  }, [application.id]);
  const onResize = useCallback(
    (height: number, width: number) => {
      resizeWindow({ height, id, width });
    },
    [id]
  );

  return (
    <Draggable
      cancel={'[draggable="false"]'}
      defaultPosition={{
        x: left,
        y: top,
      }}
      disabled={zoomed}
      nodeRef={rootRef}
      onStart={(e) => {
        if (e.shiftKey) {
          return false;
        }

        setIsDragging(true);
      }}
      onStop={(_, { x, y }) => {
        setIsDragging(false);

        if (x !== left || y !== top) {
          moveWindow({ id, left: x, top: y });
        }
      }}>
      <section
        aria-current={focused}
        aria-labelledby={`${id}-title`}
        className={clsx(styles.root, {
          [styles.dragging]: isDragging,
          [styles.zoomed]: zoomed,
        })}
        hidden={hidden}
        id={id}
        onBlur={(e) => {
          if (
            document.hasFocus() &&
            !e.currentTarget?.contains(e.relatedTarget)
          ) {
            blurWindow({ id });
          }
        }}
        onFocus={(e) => {
          if (
            !focused &&
            (!e.relatedTarget || !e.currentTarget?.contains(e.relatedTarget))
          ) {
            focusWindow({ id });
          }
        }}
        ref={rootRef}
        role="dialog"
        style={{
          zIndex: stackingOrder.indexOf(id),
        }}
        tabIndex={-1}>
        <WindowContext.Provider value={contextValue}>
          <Titlebar maxWidth={rootWidth} />
          {Boolean(aboutDialogContent) && (
            <Dialog className={styles.dialog} draggable={false}>
              {aboutDialogContent}
              <footer>
                <button
                  autoFocus
                  formMethod="dialog"
                  onClick={() => {
                    setAboutDialogContent(null);
                    activateWindow({ id });
                  }}
                  type="reset">
                  OK
                </button>
              </footer>
            </Dialog>
          )}
          <div className={styles.content} draggable="false">
            <ErrorBoundary
              fallback={
                <Content>
                  <Dialog className={styles.dialog} draggable={false}>
                    <p>{application.title} has encountered an unknown error.</p>
                    <footer>
                      <button
                        autoFocus
                        formMethod="dialog"
                        onClick={onClose}
                        type="reset">
                        Close window
                      </button>
                    </footer>
                  </Dialog>
                </Content>
              }>
              <application.Component
                Content={Content}
                Menu={Menu}
                Menubar={Menubar}
                Menuitem={Menuitem}
                file={file}
                onAbout={onAbout}
                onClose={onClose}
                onNew={onNew}
                onOpen={onOpen}
                onQuit={onQuit}
                onResize={onResize}
                openableFiles={openableFiles}
              />
            </ErrorBoundary>
          </div>
        </WindowContext.Provider>
      </section>
    </Draggable>
  );
};

Window.displayName = "Window";
