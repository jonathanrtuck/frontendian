import {
  CSSProperties,
  FunctionComponent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

import { useStore } from "@/store";
import { userSelect } from "@/utils";

import { Item } from "./components/Item";

import styles from "./Desktop.module.css";

type Coordinates = {
  x: number;
  y: number;
};

export const Desktop: FunctionComponent = () => {
  const open = useStore((actions) => actions.open);
  const applications = useStore((state) => state.applications);
  const desktop = useStore((state) => state.desktop);
  const files = useStore((state) => state.files);
  const types = useStore((state) => state.types);

  const rootRef = useRef<HTMLElement>(null);

  const [selection, setSelection] = useState<{
    from?: Coordinates;
    to?: Coordinates;
  }>({});

  const applicationsAndFiles = [...applications, ...files];
  const icons = desktop.map((id) =>
    applicationsAndFiles.find((obj) => obj.id === id)
  );

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
      {icons.map((obj) =>
        obj ? (
          <Item
            Icon={"windowIds" in obj ? obj.Icon : types[obj.type]?.Icon}
            key={obj.id}
            onClick={() => {
              open({
                id: obj.id,
                type: "windowIds" in obj ? "application" : "file",
              });
            }}
            title={obj.title}
          />
        ) : null
      )}
    </nav>
  );
};
