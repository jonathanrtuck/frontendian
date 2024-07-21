import {
  CSSProperties,
  FunctionComponent,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import styles from "./Desktop.module.css";

type Coordinates = {
  x: number;
  y: number;
};

const allowSelection = (): void => {
  document.body.style.userSelect = "";
  document.body.style.removeProperty("-webkit-user-select"); // for safari
};

const preventSelection = (): void => {
  document.body.style.userSelect = "none";
  document.body.style.setProperty("-webkit-user-select", "none"); // for safari
};

export const Desktop: FunctionComponent<{}> = () => {
  const rootRef = useRef<HTMLElement>(null);

  const [selection, setSelection] = useState<{
    from?: Coordinates;
    to?: Coordinates;
  }>({});

  const selectionStyles = useMemo<CSSProperties>(() => {
    const { from, to } = selection;

    return from && to
      ? {
          display: "block",
          height: Math.abs(from.y - to.y),
          left: Math.min(from.x, to.x),
          top: Math.min(from.y, to.y),
          width: Math.abs(from.x - to.x),
        }
      : {
          display: "none",
        };
  }, [selection]);

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
    allowSelection();
    setSelection({});
  }, [onMouseMove]);

  useEffect(
    () => () => {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onMouseUp);
      allowSelection();
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
          preventSelection();
          setSelection({
            from: {
              x: clientX,
              y: clientY,
            },
          });
        }
      }}
      ref={rootRef}>
      <i>desktop…</i>
      <span className={styles.selection} style={selectionStyles} />
    </nav>
  );
};
