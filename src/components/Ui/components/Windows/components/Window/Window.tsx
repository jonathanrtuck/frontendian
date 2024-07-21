import clsx from "clsx";
import Draggable from "react-draggable";
import { FunctionComponent, useRef } from "react";

import { Content } from "./components/Content";
import { TitleBar } from "./components/TitleBar";
import { MenuBar } from "components/MenuBar";
import { useElementDimensions, useFocus } from "hooks";
import { useStore } from "store";
import { Window as WindowType } from "types";

import styles from "./Window.module.css";

export const Window: FunctionComponent<WindowType> = ({
  focused,
  height,
  hidden,
  id,
  left,
  title,
  titleBarLeft,
  top,
  width,
  zoomed,
}) => {
  // state
  const stackingOrder = useStore((state) => state.stackingOrder);
  // actions
  const blur = useStore((actions) => actions.blur);
  const close = useStore((actions) => actions.close);
  const focus = useStore((actions) => actions.focus);
  const hide = useStore((actions) => actions.hide);
  const move = useStore((actions) => actions.move);
  const resize = useStore((actions) => actions.resize);
  const zoom = useStore((actions) => actions.zoom);

  const menuBarRef = useRef<HTMLElement>(null);
  const rootRef = useRef<HTMLElement>(null);

  useFocus(rootRef, [focused]);

  const { width: rootWidth } = useElementDimensions(rootRef, [width, zoomed]);

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
        move({ id, left, top, type: "window" });
      }}>
      <section
        aria-current={focused}
        aria-label={title}
        className={clsx(styles.root, {
          [styles.zoomed]: zoomed,
        })}
        hidden={hidden}
        id={id}
        onBlur={({ relatedTarget }) => {
          if (!rootRef.current?.contains(relatedTarget)) {
            blur({ id });
          }
        }}
        onFocus={({ relatedTarget }) => {
          if (!relatedTarget || !rootRef.current?.contains(relatedTarget)) {
            focus({ id });
          }
        }}
        ref={rootRef}
        role="dialog"
        style={{
          zIndex: stackingOrder.indexOf(id),
        }}
        tabIndex={0}>
        <TitleBar
          classes={{
            button: styles.button,
          }}
          left={titleBarLeft}
          maxWidth={rootWidth}
          onClose={() => {
            close({ id });
          }}
          onHide={() => {
            hide({ id });
          }}
          onMove={(left) => {
            move({ id, left, type: "titlebar" });
          }}
          onZoom={() => {
            zoom({ id });
          }}
          title={title}
        />
        <MenuBar
          className={styles.menubar}
          orientation="horizontal"
          ref={menuBarRef}
        />
        <Content
          className={styles.content}
          height={height}
          menuBarRef={menuBarRef}
          onResize={(size) => {
            resize({ id, ...size });
          }}
          width={width}
          zoomed={zoomed}
        />
      </section>
    </Draggable>
  );
};
