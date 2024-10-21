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
  Dialog,
  ErrorBoundary,
  Menu,
  Menuitem,
  WindowContent,
  WindowMenu,
  WindowTitlebar,
} from "@/components";
import { SYSTEM_BAR_ID } from "@/constants";
import { WindowContext, WindowContextType } from "@/contexts";
import { useFocus, useStore, useStyles } from "@/hooks";
import {
  blurWindow,
  closeApplication,
  closeWindow,
  focusWindow,
  moveWindow,
  openFile,
  openWindow,
  resizeWindow,
} from "@/store";
import { ComponentName, File, ID, Pixels, Window as WindowType } from "@/types";
import { getTitle } from "@/utils";

const COMPONENT_NAME: ComponentName = "Window";

export const Window: FunctionComponent<WindowType> = (props) => {
  const { collapsed, fileId, focused, hidden, id, left, top } = props;

  const menubarRef = useRef<HTMLMenuElement>(null);
  const rootRef = useRef<HTMLElement>(null);

  useFocus({
    deps: [focused],
    ref: rootRef,
  });

  const applications = useStore((state) => state.applications);
  const files = useStore((state) => state.files);
  const stackingOrder = useStore((state) => state.stackingOrder);
  const theme = useStore((state) => state.theme);
  const types = useStore((state) => state.types);
  const styles = useStyles(COMPONENT_NAME);

  const [aboutDialogContent, setAboutDialogContent] = useState<ReactNode>(null);

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
    <ErrorBoundary
      fallback={
        <Dialog className={styles.dialog} modal open type="error">
          <p>{getTitle(application)} has encountered an unknown error.</p>
          <footer>
            <Button
              autoFocus
              formMethod="dialog"
              onClick={onClose}
              type="reset">
              Close
            </Button>
          </footer>
        </Dialog>
      }>
      <Draggable
        cancel="[draggable='false']"
        nodeRef={rootRef}
        onStart={(e) => {
          if (e.shiftKey) {
            return false;
          }
        }}
        onStop={(_, { x, y }) => {
          if (x !== left || y !== top) {
            moveWindow({ id, left: x, top: y });
          }
        }}
        position={{
          x: left,
          y: top,
        }}>
        <section
          aria-current={focused}
          aria-labelledby={`${id}-title`}
          className={clsx(styles.root, {
            [styles.collapsed]: collapsed,
          })}
          hidden={hidden}
          id={id}
          onBlur={(e) => {
            if (
              document.hasFocus() &&
              !e.currentTarget?.contains(e.relatedTarget) &&
              (isMenubarWindowed ||
                !document
                  .getElementById(SYSTEM_BAR_ID)
                  ?.contains(e.relatedTarget))
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
            <WindowTitlebar />
            <div
              className={styles.frame}
              hidden={Boolean(isCollapsible && collapsed)}>
              <application.Component
                Content={WindowContent}
                Menu={Menu}
                Menubar={WindowMenu}
                Menuitem={Menuitem}
                file={file}
                onAbout={onAbout}
                onClose={onClose}
                onNew={onNew}
                onOpen={onOpen}
                onQuit={onQuit}
                onResize={onResize}
                openableFiles={openableFiles}
                theme={theme}
              />
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
    </ErrorBoundary>
  );
};

Window.displayName = COMPONENT_NAME;
