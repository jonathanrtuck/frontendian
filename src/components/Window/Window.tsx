"use client";

import "./Window.theme-beos.css";
import "./Window.theme-mac-os-classic.css";
import * as applications from "@/applications";
import {
  Dialog,
  ErrorBoundary,
  Menu,
  Menuitem,
  WindowContent,
  WindowHeader,
  WindowMenu,
} from "@/components";
import { WindowContext } from "@/contexts";
import * as files from "@/files";
import { useFocus } from "@/hooks";
import { MIMETYPES } from "@/mimetypes";
import { useStore } from "@/store";
import { THEME_BEOS, THEME_MAC_OS_CLASSIC } from "@/themes";
import type { File, Pixels, Window as WindowType } from "@/types";
import type {
  ContextType,
  FunctionComponent,
  ReactNode,
  RefObject,
} from "react";
import { useCallback, useMemo, useRef, useState } from "react";
import Draggable from "react-draggable";

export const Window: FunctionComponent<WindowType> = (props) => {
  const {
    applicationId,
    collapsed,
    fileId,
    focused,
    hidden,
    id,
    left,
    top,
    zoomed,
  } = props;
  const blurWindow = useStore((store) => store.blurWindow);
  const closeApplication = useStore((store) => store.closeApplication);
  const closeWindow = useStore((store) => store.closeWindow);
  const focusWindow = useStore((store) => store.focusWindow);
  const moveWindow = useStore((store) => store.moveWindow);
  const openFile = useStore((store) => store.openFile);
  const openWindow = useStore((store) => store.openWindow);
  const resizeWindow = useStore((store) => store.resizeWindow);
  const stackingOrder = useStore((store) => store.stackingOrder);
  const systemBarId = useStore((store) => store.systemBarId);
  const themeId = useStore((store) => store.themeId);
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
  const application = Object.values(applications).find(
    ({ id }) => id === applicationId
  )!;
  const file = Object.values(files).find(({ id }) => id === fileId);
  const isCollapsible = themeId === THEME_MAC_OS_CLASSIC.id;
  const isDialogModal = themeId === THEME_BEOS.id;
  const isMenubarWindowed = themeId === THEME_BEOS.id;
  const openableFiles = Object.entries(MIMETYPES)
    .filter(([, { applicationId }]) => applicationId === application.id)
    .reduce(
      (acc: File[], [mimetype]) =>
        acc.concat(
          Object.values(files).filter((file) => file.mimetype === mimetype)
        ),
      []
    );
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
        <Dialog modal={isDialogModal} onClose={onClose} open type="error">
          <p>
            {application.getTitle({ themeId })} has encountered an unknown
            error.
          </p>
        </Dialog>
      }>
      <Draggable
        cancel="[draggable='false']"
        nodeRef={rootRef as RefObject<HTMLElement>}
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
          aria-expanded={zoomed}
          aria-labelledby={`${id}-title`}
          className="component-window"
          hidden={hidden}
          id={id}
          onBlur={(e) => {
            if (
              document.hasFocus() &&
              !e.currentTarget?.contains(e.relatedTarget) &&
              (isMenubarWindowed ||
                !document
                  .getElementById(systemBarId)
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
          style={{ zIndex: stackingOrder.indexOf(id) }}
          tabIndex={-1}>
          <WindowContext.Provider value={contextValue}>
            <WindowHeader />
            <article aria-hidden={Boolean(isCollapsible && collapsed)}>
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
                themeId={themeId}
              />
            </article>
          </WindowContext.Provider>
        </section>
      </Draggable>
      <Dialog
        modal={isDialogModal}
        onClose={() => setAboutDialogContent(null)}
        open={Boolean(aboutDialogContent)}
        type="info">
        {aboutDialogContent}
      </Dialog>
    </ErrorBoundary>
  );
};

Window.displayName = "Window";
