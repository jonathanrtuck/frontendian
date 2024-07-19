import clsx from "clsx";
import Draggable from "react-draggable";
import { FunctionComponent, useRef } from "react";
import { Resizable } from "react-resizable";

import { Content } from "./components/Content";
import { TitleBar } from "./components/TitleBar";
import { MenuBar } from "components/MenuBar";
import { MenuItem } from "components/MenuItem";
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
  const rootRef = useRef<HTMLElement>(null);

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
      onStop={(_, { x, y }) => {
        console.debug("move window", x, y);
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
          onClose={() => {
            console.debug("close");
          }}
          onZoom={() => {
            console.debug("zoom");
          }}
          title={title}
        />
        <MenuBar className={styles.menubar} orientation="horizontal">
          <MenuItem title="File" />
          <MenuItem title="View" />
          <MenuItem title="Help" />
        </MenuBar>
        <Content
          className={styles.content}
          height={zoomed ? undefined : height}
          width={zoomed ? undefined : width}
        />
      </section>
    </Draggable>
  );
};
