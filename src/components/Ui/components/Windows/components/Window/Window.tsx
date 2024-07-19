import clsx from "clsx";
import Draggable from "react-draggable";
import { FunctionComponent, useContext, useRef } from "react";

import { Content } from "./components/Content";
import { TitleBar } from "./components/TitleBar";
import { MenuBar } from "components/MenuBar";
import { MenuItem } from "components/MenuItem";
import { StateContext } from "contexts";
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
  const [, dispatch] = useContext(StateContext);

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
        dispatch({
          payload: {
            ids: [id],
            left: x,
            top: y,
            type: "window",
          },
          type: "MOVE",
        });
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
            dispatch({
              payload: {
                ids: [id],
                type: "window",
              },
              type: "CLOSE",
            });
          }}
          onMove={(left) => {
            dispatch({
              payload: {
                ids: [id],
                left,
                type: "titleBar",
              },
              type: "MOVE",
            });
          }}
          onZoom={() => {
            dispatch({
              payload: {
                ids: [id],
              },
              type: "ZOOM",
            });
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
          height={height}
          onResize={(size) => {
            dispatch({
              payload: {
                ids: [id],
                ...size,
              },
              type: "RESIZE",
            });
          }}
          width={width}
        />
      </section>
    </Draggable>
  );
};
