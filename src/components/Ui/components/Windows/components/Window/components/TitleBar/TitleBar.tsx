import clsx from "clsx";
import Draggable from "react-draggable";
import {
  FunctionComponent,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import { useStore } from "store";
import { ID } from "types";
import { getComputedCustomProperty } from "utils";

import styles from "./TitleBar.module.css";

export const TitleBar: FunctionComponent<{
  classes?: {
    button?: string;
    root?: string;
    title?: string;
  };
  id: ID;
  left: number;
  maxWidth: number;
  onClose(): void;
  onMove(left: number): void;
  onZoom?(): void;
  title: string;
}> = ({ classes, id, left, maxWidth, onClose, onMove, onZoom, title }) => {
  const hide = useStore((actions) => actions.hide);

  const rootRef = useRef<HTMLElement>(null);
  const touchRef = useRef<number>(0);

  const [rootWidth, setRootWidth] = useState<number>(0);

  const offset = useMemo<number>(
    () => getComputedCustomProperty("--window-padding"),
    []
  );

  useLayoutEffect(() => {
    if (rootRef.current) {
      setRootWidth(rootRef.current.offsetWidth);
    }
  }, [maxWidth, onZoom, title]);

  return (
    <Draggable
      axis="x"
      bounds="parent"
      cancel={`.${styles.button}`}
      nodeRef={rootRef}
      onStart={(e) => {
        if (!e.shiftKey) {
          return false;
        }
      }}
      onStop={(_, { x }) => {
        onMove(x - offset);
      }}
      position={{
        x: Math.min(left + offset, maxWidth - rootWidth + offset),
        y: 0,
      }}>
      <header
        className={clsx(classes?.root, styles.root)}
        onDoubleClick={(e) => {
          const isButton = (e.target as HTMLElement)?.classList.contains(
            styles.button
          );

          if (!isButton) {
            hide({ id });
          }
        }}
        onPointerUp={(e) => {
          const now = Date.now();
          const isButton = (e.target as HTMLElement)?.classList.contains(
            styles.button
          );

          if (!isButton) {
            const isDoubleClick = now - touchRef.current < 500;

            if (isDoubleClick) {
              hide({ id });
            }

            touchRef.current = now;
          }
        }}
        ref={rootRef}>
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
