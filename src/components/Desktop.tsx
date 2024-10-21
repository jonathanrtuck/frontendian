import {
  CSSProperties,
  FunctionComponent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

import { Icon } from "@/components";
import { useStore, useStyles } from "@/hooks";
import { openApplication, openFile } from "@/store";
import { Pixels } from "@/types";
import { getTitle } from "@/utils";

type Coordinates = {
  x: Pixels;
  y: Pixels;
};

const setUserCanSelectText = (userCanSelectText: boolean): void => {
  if (userCanSelectText) {
    document.body.style.userSelect = "";
    document.body.style.removeProperty("-webkit-user-select"); // for safari
  } else {
    document.body.style.userSelect = "none";
    document.body.style.setProperty("-webkit-user-select", "none"); // for safari
  }
};

export const Desktop: FunctionComponent = () => {
  const applications = useStore((state) => state.applications);
  const desktop = useStore((state) => state.desktop);
  const files = useStore((state) => state.files);
  const types = useStore((state) => state.types);
  const styles = useStyles("Desktop");

  const rootRef = useRef<HTMLDivElement>(null);

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
    setUserCanSelectText(true);
    setSelection({});
  }, [onMouseMove]);

  const applicationsAndFiles = [...applications, ...files];
  const icons = desktop.map((id) =>
    applicationsAndFiles.find((obj) => obj.id === id)
  );

  useEffect(
    () => () => {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onMouseUp);
      setUserCanSelectText(true);
    },
    [onMouseMove, onMouseUp]
  );

  return (
    <div
      aria-label="Desktop"
      className={styles.root}
      onMouseDown={({ button, buttons, clientX, clientY, target }) => {
        if ((button === 0 || buttons === 1) && target === rootRef.current) {
          document.addEventListener("mousemove", onMouseMove);
          document.addEventListener("mouseup", onMouseUp);
          setUserCanSelectText(false);
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
          <Icon
            Component={"windowIds" in obj ? obj.Icon : types[obj.type]?.Icon}
            key={obj.id}
            onClick={() => {
              "windowIds" in obj
                ? openApplication({ id: obj.id })
                : openFile({ id: obj.id });
            }}
            title={getTitle(obj)}
          />
        ) : null
      )}
    </div>
  );
};

Desktop.displayName = "Desktop";
