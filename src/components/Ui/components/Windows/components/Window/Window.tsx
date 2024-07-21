import clsx from "clsx";
import Draggable from "react-draggable";
import { FunctionComponent, useLayoutEffect, useRef, useState } from "react";

import { Content } from "./components/Content";
import { TitleBar } from "./components/TitleBar";
import { MenuBar } from "components/MenuBar";
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
  const close = useStore((actions) => actions.close);
  const hide = useStore((actions) => actions.hide);
  const move = useStore((actions) => actions.move);
  const resize = useStore((actions) => actions.resize);
  const zoom = useStore((actions) => actions.zoom);

  const menuBarRef = useRef<HTMLElement>(null);
  const rootRef = useRef<HTMLElement>(null);

  const [rootWidth, setRootWidth] = useState<number>(0);

  useLayoutEffect(() => {
    if (rootRef.current) {
      setRootWidth(rootRef.current.offsetWidth);
    }
  }, [width, zoomed]);

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
        ref={rootRef}
        role="dialog">
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
