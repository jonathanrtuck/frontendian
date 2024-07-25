import clsx from "clsx";
import { FunctionComponent, ReactElement, useRef, useState } from "react";
import Draggable from "react-draggable";

import { APPLICATION_TRACKER } from "@/applications";
import { Menu } from "@/components/Menu";
import { MenuitemProps } from "@/components/Menuitem";
import { MenuitemsContext } from "@/contexts";
import { useElementDimensions, useFocus, useMenuitems } from "@/hooks";
import { useStore } from "@/store";
import { Window as WindowType } from "@/types";

import { Content } from "./components/Content";
import { Titlebar } from "./components/Titlebar";

import styles from "./Window.module.css";

export type WindowProps = WindowType;

// @todo dialogs
export const Window: FunctionComponent<WindowProps> = ({
  fileId,
  focused,
  height,
  hidden,
  id,
  left,
  title,
  titlebarLeft,
  top,
  width,
  zoomed,
}) => {
  const blurWindow = useStore((actions) => actions.blurWindow);
  const closeWindow = useStore((actions) => actions.closeWindow);
  const focusWindow = useStore((actions) => actions.focusWindow);
  const hideWindow = useStore((actions) => actions.hideWindow);
  const moveWindow = useStore((actions) => actions.moveWindow);
  const moveWindowTitlebar = useStore((actions) => actions.moveWindowTitlebar);
  const resizeWindow = useStore((actions) => actions.resizeWindow);
  const zoomWindow = useStore((actions) => actions.zoomWindow);
  const applications = useStore((state) => state.applications);
  const files = useStore((state) => state.files);
  const stackingOrder = useStore((state) => state.stackingOrder);

  const menubarRef = useRef<HTMLElement>(null);
  const rootRef = useRef<HTMLElement>(null);

  const [menuitems, setMenuitems] = useState<ReactElement<MenuitemProps>[]>([]);

  useFocus({
    deps: [focused],
    ref: rootRef,
  });

  const { width: rootWidth } = useElementDimensions(rootRef, [width, zoomed]);

  const application = applications.find(({ windowIds }) =>
    windowIds.includes(id)
  );
  const file = fileId ? files.find(({ id }) => id === fileId) : undefined;

  if (!application?.Component) {
    return null;
  }

  return (
    <Draggable
      cancel={`.${styles.button}, .${styles.menubar}, .${styles.content}`}
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
      }}
      onStop={(_, { x: left, y: top }) => {
        moveWindow({ id, left, top });
      }}>
      <section
        aria-current={focused}
        aria-labelledby={`${id}-title`}
        className={clsx(styles.root, {
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
        <Titlebar
          classes={{
            button: styles.button,
          }}
          id={id}
          left={titlebarLeft}
          maxWidth={rootWidth}
          onClose={() => {
            closeWindow({ id });
          }}
          onHide={() => {
            hideWindow({ id });
          }}
          onMove={(left) => {
            moveWindowTitlebar({ id, left });
          }}
          onZoom={() => {
            zoomWindow({ id });
          }}
          title={title}
        />
        <Menu bar className={styles.menubar} horizontal ref={menubarRef}>
          {menuitems}
        </Menu>
        <Content
          className={styles.content}
          height={height}
          menubarRef={menubarRef}
          onResize={(size) => {
            resizeWindow({ id, ...size });
          }}
          width={width}
          zoomed={zoomed}>
          <MenuitemsContext.Provider value={setMenuitems}>
            <application.Component file={file} useMenuitems={useMenuitems} />
          </MenuitemsContext.Provider>
        </Content>
      </section>
    </Draggable>
  );
};
