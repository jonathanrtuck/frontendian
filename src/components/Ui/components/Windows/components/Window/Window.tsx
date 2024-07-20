import clsx from "clsx";
import Draggable from "react-draggable";
import { FunctionComponent, useRef, useState } from "react";

import { Content } from "./components/Content";
import { TitleBar } from "./components/TitleBar";
import { MenuBar } from "components/MenuBar";
import { MenuItem } from "components/MenuItem";
import { useStore } from "store";
import { Window as WindowType } from "types";

import styles from "./Window.module.css";

const getMenuBarWidth = (node: HTMLElement | null): number | undefined =>
  node?.childNodes.length
    ? Array.prototype.reduce.call<NodeList, any[], number>(
        node.childNodes,
        (acc: number, menuItem: HTMLElement) => acc + menuItem.offsetWidth,
        0
      )
    : undefined;

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
  const closeWindows = useStore((actions) => actions.closeWindows);
  const moveWindowTitleBar = useStore((actions) => actions.moveWindowTitleBar);
  const moveWindows = useStore((actions) => actions.moveWindows);
  const resizeWindows = useStore((actions) => actions.resizeWindows);
  const zoomWindows = useStore((actions) => actions.zoomWindows);

  const rootRef = useRef<HTMLElement>(null);

  const [menuBarWidth, setMenuBarWidth] = useState<number | undefined>(
    undefined
  );

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
        moveWindows([id], { left: x, top: y });
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
            closeWindows([id]);
          }}
          onMove={(titleBarLeft) => {
            moveWindowTitleBar([id], { titleBarLeft });
          }}
          onZoom={() => {
            zoomWindows([id]);
          }}
          title={title}
        />
        <MenuBar
          className={styles.menubar}
          orientation="horizontal"
          ref={(node) => {
            setMenuBarWidth(getMenuBarWidth(node));
          }}>
          <MenuItem title="File" />
          <MenuItem title="View" />
          <MenuItem title="Help" />
        </MenuBar>
        <Content
          className={styles.content}
          height={height}
          minWidth={menuBarWidth}
          onResize={(size) => {
            resizeWindows([id], size);
          }}
          width={width}
          zoomed={zoomed}
        />
      </section>
    </Draggable>
  );
};
