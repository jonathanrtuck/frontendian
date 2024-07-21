import {
  CSSProperties,
  FunctionComponent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

import { userSelect } from "utils";

import styles from "./Desktop.module.css";

type Coordinates = {
  x: number;
  y: number;
};

export const Desktop: FunctionComponent<{}> = () => {
  const rootRef = useRef<HTMLElement>(null);

  const [selection, setSelection] = useState<{
    from?: Coordinates;
    to?: Coordinates;
  }>({});

  const onMouseMove = useCallback(({ clientX, clientY }: MouseEvent) => {
    setSelection((prevState) => ({
      ...prevState,
      to: {
        x: clientX,
        y: clientY,
      },
    }));
  }, []);
  const onMouseUp = useCallback(() => {
    document.removeEventListener("mousemove", onMouseMove);
    document.removeEventListener("mouseup", onMouseUp);
    userSelect(true);
    setSelection({});
  }, [onMouseMove]);

  useEffect(
    () => () => {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onMouseUp);
      userSelect(true);
    },
    [onMouseMove, onMouseUp]
  );

  return (
    <nav
      className={styles.root}
      onMouseDown={({ button, buttons, clientX, clientY, target }) => {
        if ((button === 0 || buttons === 1) && target === rootRef.current) {
          document.addEventListener("mousemove", onMouseMove);
          document.addEventListener("mouseup", onMouseUp);
          userSelect(false);
          setSelection({
            from: {
              x: clientX,
              y: clientY,
            },
          });
        }
      }}
      ref={rootRef}
      style={
        selection.from && selection.to
          ? ({
              "--desktop-selection-display": "block",
              "--desktop-selection-height": `${Math.abs(
                selection.from.y - selection.to.y
              )}px`,
              "--desktop-selection-left": `${Math.min(
                selection.from.x,
                selection.to.x
              )}px`,
              "--desktop-selection-top": `${Math.min(
                selection.from.y,
                selection.to.y
              )}px`,
              "--desktop-selection-width": `${Math.abs(
                selection.from.x - selection.to.x
              )}px`,
            } as CSSProperties)
          : ({
              "--desktop-selection-display": "none",
            } as CSSProperties)
      }>
      <i>desktop…</i>
    </nav>
  );
};
