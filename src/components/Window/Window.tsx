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

import {
  Button,
  Content,
  Dialog,
  ErrorBoundary,
  Menu,
  Menubar,
  Menuitem,
  Titlebar,
} from "@/components";
import { MENUBAR_ID } from "@/constants";
import { WindowContext, WindowContextType } from "@/contexts";
import { useFocus, useStyles } from "@/hooks";
import {
  blurWindow,
  closeApplication,
  closeWindow,
  focusWindow,
  moveWindow,
  openFile,
  openWindow,
  resizeWindow,
  useStore,
} from "@/store";
import { File, ID, Pixels, Window as WindowType } from "@/types";

import stylesBeos from "./Window.beos.module.css";
import stylesMacOsClassic from "./Window.mac-os-classic.module.css";

export type WindowProps = WindowType;

export const Window: FunctionComponent<WindowProps> = (props) => {
  const { collapsed, fileId, focused, hidden, id, left, top } = props;

  const applications = useStore((state) => state.applications);
  const files = useStore((state) => state.files);
  const stackingOrder = useStore((state) => state.stackingOrder);
  const theme = useStore((state) => state.theme);
  const types = useStore((state) => state.types);

  const menubarRef = useRef<HTMLMenuElement>(null);
  const rootRef = useRef<HTMLElement>(null);

  const [aboutDialogContent, setAboutDialogContent] = useState<ReactNode>(null);
  const [isDragging, setIsDragging] = useState<boolean>(false);

  useFocus({
    deps: [focused],
    ref: rootRef,
  });

  const styles = useStyles({
    "theme-beos": stylesBeos,
    "theme-mac-os-classic": stylesMacOsClassic,
  });

  const application = applications.find(({ windowIds }) =>
    windowIds.includes(id)
  )!;
  const file = fileId ? files.find(({ id }) => id === fileId) : undefined;
  const isCollapsible = theme.id === "theme-mac-os-classic";
  const isMenubarWindowed = theme.id === "theme-beos";
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

  const onAbout = useCallback((node: ReactNode) => {
    setAboutDialogContent(node);
  }, []);
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
    (height: Pixels, width: Pixels) => {
      resizeWindow({ height, id, width });
    },
    [id]
  );

  return (
    <>
      <Draggable
        cancel="[draggable='false']"
        defaultPosition={{
          x: left,
          y: top,
        }}
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
            [styles.collapsed]: collapsed,
            [styles.dragging]: isDragging,
          })}
          hidden={hidden}
          id={id}
          onBlur={(e) => {
            if (
              document.hasFocus() &&
              !e.currentTarget?.contains(e.relatedTarget) &&
              (isMenubarWindowed ||
                !document.getElementById(MENUBAR_ID)?.contains(e.relatedTarget))
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
            <Titlebar />
            <div
              className={styles.content}
              hidden={Boolean(isCollapsible && collapsed)}>
              <ErrorBoundary
                fallback={
                  <Dialog
                    className={styles.dialog}
                    draggable={false}
                    modal
                    open
                    type="error">
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
      <Dialog
        className={styles.dialog}
        modal
        open={Boolean(aboutDialogContent)}
        type="info">
        {aboutDialogContent}
        <footer>
          <Button
            autoFocus
            formMethod="dialog"
            onClick={() => {
              setAboutDialogContent(null);
            }}
            type="reset">
            Close
          </Button>
        </footer>
      </Dialog>
    </>
  );
};

Window.displayName = "Window";
