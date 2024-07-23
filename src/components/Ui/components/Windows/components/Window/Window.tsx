import clsx from "clsx";
import Draggable from "react-draggable";
import { FunctionComponent, ReactElement, useRef, useState } from "react";

import { APPLICATION_TRACKER } from "applications";

import { Content } from "./components/Content";
import { TitleBar } from "./components/TitleBar";
import { Menu } from "components/Menu";
import { MenuItemProps } from "components/MenuItem";
import { useElementDimensions, useFocus } from "hooks";
import { useStore } from "store";
import { Window as WindowType } from "types";

import styles from "./Window.module.css";

export type WindowProps = WindowType;

export const Window: FunctionComponent<WindowProps> = ({
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

  const menubarRef = useRef<HTMLElement>(null);
  const rootRef = useRef<HTMLElement>(null);

  const [menuItems, setMenuItems] = useState<ReactElement<MenuItemProps>[]>([]);

  useFocus({
    deps: [focused],
    ref: rootRef,
  });

  const { width: rootWidth } = useElementDimensions(rootRef, [width, zoomed]);

  const Component = APPLICATION_TRACKER.Component; // @todo

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
        <Menu bar className={styles.menubar} horizontal ref={menubarRef}>
          {menuItems}
        </Menu>
        <Content
          className={styles.content}
          height={height}
          menubarRef={menubarRef}
          onResize={(size) => {
            resize({ id, ...size });
          }}
          width={width}
          zoomed={zoomed}>
          <Component setMenuItems={setMenuItems} />
        </Content>
      </section>
    </Draggable>
  );
};
