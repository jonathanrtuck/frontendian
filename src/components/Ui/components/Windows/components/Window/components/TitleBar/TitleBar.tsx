import clsx from "clsx";
import { FunctionComponent } from "react";

import styles from "./TitleBar.module.css";

export const TitleBar: FunctionComponent<{
  onClose(): void;
  onZoom?(): void;
  title: string;
}> = ({ onClose, onZoom, title }) => (
  <header className={styles.root}>
    <h1 className={styles.title} title={title}>
      {title}
    </h1>
    <button
      aria-label="Close"
      className={clsx(styles.button, styles.close)}
      onClick={onClose}
      title="Close"
      type="button"
    />
    {onZoom && (
      <button
        aria-label="Zoom"
        className={clsx(styles.button, styles.zoom)}
        onClick={onZoom}
        title="Zoom"
        type="button"
      />
    )}
  </header>
);
