"use client";

import { Icon } from "@/components";
import { useStore } from "@/store";
import type { Pixels } from "@/types";
import type { FunctionComponent } from "react";
import { useCallback, useEffect, useRef, useState } from "react";
import * as styles from "./Desktop.css";

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
  const applications = useStore((store) => store.applications);
  const currentThemeId = useStore((store) => store.currentThemeId);
  const desktop = useStore((store) => store.desktop);
  const files = useStore((store) => store.files);
  const openApplication = useStore((store) => store.openApplication);
  const openFile = useStore((store) => store.openFile);
  const themes = useStore((store) => store.themes);
  const types = useStore((store) => store.types);
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
  const theme = themes.find(({ id }) => id === currentThemeId)!;

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
      className={styles.root[currentThemeId]}
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
      ref={rootRef}>
      {icons.map((obj) =>
        obj ? (
          <Icon
            Component={"windowIds" in obj ? obj.Icon : types[obj.type]?.Icon}
            key={obj.id}
            onClick={() =>
              "windowIds" in obj
                ? openApplication({ id: obj.id })
                : openFile({ id: obj.id })
            }
            title={obj.getTitle(theme)}
          />
        ) : null
      )}
      <span
        aria-hidden
        className={styles.selection[currentThemeId]}
        role="presentation"
        style={
          selection.from && selection.to
            ? {
                display: "block",
                height: Math.abs(selection.from.y - selection.to.y),
                left: Math.min(selection.from.x, selection.to.x),
                top: Math.min(selection.from.y, selection.to.y),
                width: Math.abs(selection.from.x - selection.to.x),
              }
            : {
                display: "none",
              }
        }
      />
    </div>
  );
};

Desktop.displayName = "Desktop";
