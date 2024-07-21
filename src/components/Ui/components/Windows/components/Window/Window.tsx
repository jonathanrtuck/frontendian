import clsx from "clsx";
import Draggable from "react-draggable";
import { FunctionComponent, useLayoutEffect, useState, useRef } from "react";

import { Content } from "./components/Content";
import { TitleBar } from "./components/TitleBar";
import { MenuBar } from "components/MenuBar";
import { MenuItem } from "components/MenuItem";
import { useStore } from "store";
import { Window as WindowType } from "types";

import styles from "./Window.module.css";

// @todo handle potential TitleBar overflow after Window resize
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
  const move = useStore((actions) => actions.move);
  const resize = useStore((actions) => actions.resize);
  const zoom = useStore((actions) => actions.zoom);

  const menuBarRef = useRef<HTMLElement>(null);
  const rootRef = useRef<HTMLElement>(null);

  const [menuBarWidth, setMenuBarWidth] = useState<number>(0);
  const [rootWidth, setRootWidth] = useState<number>(0);

  useLayoutEffect(() => {
    if (rootRef.current) {
      setRootWidth(rootRef.current.offsetWidth);
    }
  }, [width, zoomed]);

  useLayoutEffect(() => {
    if (menuBarRef.current) {
      setMenuBarWidth(
        Array.from(menuBarRef.current.children)
          .map((element) => (element as HTMLElement).offsetWidth)
          .reduce((acc, width) => acc + width, 0)
      );
    }
  }, []); // @todo menuBarItems

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
          id={id}
          left={titleBarLeft}
          maxWidth={rootWidth}
          onClose={() => {
            close({ id });
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
          ref={menuBarRef}>
          <MenuItem title="File" />
          <MenuItem title="View" />
          <MenuItem title="Help" />
        </MenuBar>
        <Content
          className={styles.content}
          height={height}
          minWidth={menuBarWidth}
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
