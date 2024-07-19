import clsx from "clsx";
import Draggable from "react-draggable";
import { FunctionComponent, useMemo, useRef } from "react";

import styles from "./TitleBar.module.css";

export const TitleBar: FunctionComponent<{
  classes?: {
    button?: string;
    root?: string;
    title?: string;
  };
  left: number;
  onClose(): void;
  onZoom?(): void;
  title: string;
}> = ({ classes, left, onClose, onZoom, title }) => {
  const rootRef = useRef<HTMLElement>(null);

  // @todo handle other css units for window padding as needed
  const offset = useMemo<number>(() => {
    const style = getComputedStyle(document.body);
    const windowPadding = style.getPropertyValue("--window-padding");
    const fontSize = parseInt(style.fontSize, 10);

    if (windowPadding.endsWith("rem")) {
      return parseFloat(windowPadding) * fontSize;
    }

    return 0;
  }, []);

  return (
    <Draggable
      axis="x"
      bounds="parent"
      cancel={`.${styles.button}`}
      defaultPosition={{
        x: left + offset,
        y: 0,
      }}
      nodeRef={rootRef}
      onStart={(e) => {
        if (!e.shiftKey) {
          return false;
        }
      }}
      onStop={(_, { x }) => {
        console.debug("move titlebar", x - offset);
      }}>
      <header className={clsx(classes?.root, styles.root)} ref={rootRef}>
        <h1 className={clsx(classes?.title, styles.title)} title={title}>
          {title}
        </h1>
        <button
          aria-label="Close"
          className={clsx(classes?.button, styles.button, styles.close)}
          onClick={onClose}
          title="Close"
          type="button"
        />
        {onZoom && (
          <button
            aria-label="Zoom"
            className={clsx(classes?.button, styles.button, styles.zoom)}
            onClick={onZoom}
            title="Zoom"
            type="button"
          />
        )}
      </header>
    </Draggable>
  );
};
