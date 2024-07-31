import clsx from "clsx";
import { FunctionComponent, useCallback, useRef, useState } from "react";
import Draggable from "react-draggable";

import { Menu } from "@/components/Menu";
import { Menuitem } from "@/components/Menuitem";
import { WindowContext } from "@/contexts";
import { useElementDimensions, useFocus } from "@/hooks";
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
import { File, ID, Window as WindowType } from "@/types";

import { Content } from "./components/Content";
import { Menubar } from "./components/Menubar";
import { Titlebar } from "./components/Titlebar";

import styles from "./Window.module.css";

export type WindowProps = WindowType;

// @todo dialogs
export const Window: FunctionComponent<WindowProps> = (props) => {
  const { fileId, focused, hidden, id, left, top, width, zoomed } = props;

  const applications = useStore((state) => state.applications);
  const files = useStore((state) => state.files);
  const stackingOrder = useStore((state) => state.stackingOrder);
  const types = useStore((state) => state.types);

  const menubarRef = useRef<HTMLMenuElement>(null);
  const rootRef = useRef<HTMLElement>(null);

  const [isDragging, setIsDragging] = useState<boolean>(false);

  useFocus({
    deps: [focused],
    ref: rootRef,
  });

  const { width: rootWidth } = useElementDimensions(rootRef, [width, zoomed]);

  const application = applications.find(({ windowIds }) =>
    windowIds.includes(id)
  );

  // these are passed down to the application component
  const onAbout = useCallback(() => {
    // setIsAboutDialogOpen(true);
  }, []);
  const onClose = useCallback(() => {
    closeWindow({ id });
  }, [id]);
  const onNew = useCallback(() => {
    if (application?.id) {
      openWindow({ id: application.id });
    }
  }, [application?.id]);
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
    if (application?.id) {
      closeApplication({ id: application.id });
    }
  }, [application?.id]);
  const onResize = useCallback(
    (height: number, width: number) => {
      resizeWindow({ height, id, width });
    },
    [id]
  );

  if (!application?.Component) {
    return null;
  }

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
      onStop={(_, { x: left, y: top }) => {
        setIsDragging(false);

        moveWindow({ id, left, top });
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
        onBlur={({ relatedTarget }) => {
          if (!rootRef.current?.contains(relatedTarget)) {
            blurWindow({ id });
          }
        }}
        onFocus={({ relatedTarget }) => {
          if (!relatedTarget || !rootRef.current?.contains(relatedTarget)) {
            focusWindow({ id });
          }
        }}
        ref={rootRef}
        role="dialog"
        style={{
          zIndex: stackingOrder.indexOf(id),
        }}
        tabIndex={0}>
        <WindowContext.Provider
          value={{
            ...props,
            menubarRef,
          }}>
          <Titlebar maxWidth={rootWidth} />
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
        </WindowContext.Provider>
      </section>
    </Draggable>
  );
};
