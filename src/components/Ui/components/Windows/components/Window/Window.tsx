import clsx from "clsx";
import { FunctionComponent } from "react";

import { Content } from "./components/Content";
import { TitleBar } from "./components/TitleBar";
import { MenuBar } from "components/MenuBar";
import { MenuItem } from "components/MenuItem";
import { Window as WindowType } from "types";

import styles from "./Window.module.css";

export const Window: FunctionComponent<WindowType> = ({
  height,
  id,
  left,
  title,
  top,
  width,
  zoomed,
}) => (
  <section
    aria-current="true"
    aria-label={title}
    className={clsx(styles.root, {
      [styles.zoomed]: zoomed,
    })}
    id={id}
    role="dialog"
    style={{
      left,
      top,
    }}>
    <TitleBar
      onClose={() => {
        console.debug("close");
      }}
      onZoom={() => {
        console.debug("zoom");
      }}
      title={title}
    />
    <MenuBar orientation="horizontal">
      <MenuItem title="File" />
      <MenuItem title="View" />
      <MenuItem title="Help" />
    </MenuBar>
    <Content
      height={zoomed ? undefined : height}
      width={zoomed ? undefined : width}
    />
  </section>
);
