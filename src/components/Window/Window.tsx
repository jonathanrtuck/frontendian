"use client";

import {
  Button,
  Dialog,
  ErrorBoundary,
  Menu,
  Menuitem,
  WindowContent,
  WindowHeader,
  WindowMenu,
} from "@/components";
import { WindowContext } from "@/contexts";
import { useFocus } from "@/hooks";
import { useStore } from "@/store";
import { THEME_BEOS, THEME_MAC_OS_CLASSIC } from "@/themes";
import { File, Pixels, Window as WindowType } from "@/types";
import type { ContextType, FunctionComponent, ReactNode } from "react";
import { useCallback, useMemo, useRef, useState } from "react";
import * as styles from "./Window.css";

export const Window: FunctionComponent<WindowType> = (props) => {
  const { collapsed, fileId, focused, hidden, id, left, top } = props;
  const applications = useStore((store) => store.applications);
  const blurWindow = useStore((store) => store.blurWindow);
  const closeApplication = useStore((store) => store.closeApplication);
  const closeWindow = useStore((store) => store.closeWindow);
  const currentThemeId = useStore((store) => store.currentThemeId);
  const files = useStore((store) => store.files);
  const focusWindow = useStore((store) => store.focusWindow);
  const openFile = useStore((store) => store.openFile);
  const openWindow = useStore((store) => store.openWindow);
  const resizeWindow = useStore((store) => store.resizeWindow);
  const stackingOrder = useStore((store) => store.stackingOrder);
  const systemBarId = useStore((store) => store.systemBarId);
  const themes = useStore((store) => store.themes);
  const types = useStore((store) => store.types);
  const menubarRef = useRef<HTMLMenuElement>(null);
  const rootRef = useRef<HTMLElement>(null);
  const [aboutDialogContent, setAboutDialogContent] = useState<ReactNode>(null);
  const contextValue = useMemo<ContextType<typeof WindowContext>>(
    () => ({
      ...props,
      menubarRef,
    }),
    [props]
  );
  const application = applications.find(({ windowIds }) =>
    windowIds.includes(id)
  )!;
  const file = fileId ? files.find(({ id }) => id === fileId) : undefined;
  const isCollapsible = currentThemeId === THEME_MAC_OS_CLASSIC.id;
  const isMenubarWindowed = currentThemeId === THEME_BEOS.id;
  const openableFiles = Object.entries(types)
    .filter(
      ([, { application: applicationId }]) => applicationId === application.id
    )
    .reduce(
      (acc: File[], [type]) =>
        acc.concat(files.filter((file) => file.type === type)),
      []
    );
  const theme = themes.find(({ id }) => id === currentThemeId)!;
  const onAbout = useCallback(
    (node: ReactNode) => setAboutDialogContent(node),
    []
  );
  const onClose = useCallback(() => closeWindow({ id }), [closeWindow, id]);
  const onNew = useCallback(
    () => openWindow({ id: application.id }),
    [application.id, openWindow]
  );
  const onOpen = useCallback(
    (fileId: File["id"]) =>
      openFile({
        id: fileId,
        windowId: id,
      }),
    [id, openFile]
  );
  const onQuit = useCallback(
    () => closeApplication({ id: application.id }),
    [application.id, closeApplication]
  );
  const onResize = useCallback(
    (height: Pixels, width: Pixels) => resizeWindow({ height, id, width }),
    [id, resizeWindow]
  );

  useFocus({
    deps: [focused],
    ref: rootRef,
  });

  return (
    <ErrorBoundary
      fallback={
        <Dialog modal open type="error">
          <p>{application.getTitle(theme)} has encountered an unknown error.</p>
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
      <section
        aria-current={focused}
        aria-labelledby={`${id}-title`}
        className={styles.root[currentThemeId]}
        hidden={hidden}
        id={id}
        onBlur={(e) => {
          if (
            document.hasFocus() &&
            !e.currentTarget?.contains(e.relatedTarget) &&
            (isMenubarWindowed ||
              !document.getElementById(systemBarId)?.contains(e.relatedTarget))
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
          <WindowHeader />
          <div
            className={styles.frame[currentThemeId]}
            hidden={Boolean(isCollapsible && collapsed)}
            role="article">
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
      <Dialog modal open={Boolean(aboutDialogContent)} type="info">
        {aboutDialogContent}
        <footer>
          <Button
            autoFocus
            formMethod="dialog"
            onClick={() => setAboutDialogContent(null)}
            type="reset">
            Close
          </Button>
        </footer>
      </Dialog>
    </ErrorBoundary>
  );
};

Window.displayName = "Window";
