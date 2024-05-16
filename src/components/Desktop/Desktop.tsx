import {
  CSSProperties,
  FunctionComponent,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

import { StateContext } from "contexts";

import styles from "./Desktop.module.css";

type SelectionCoordinates = [
  [fromX: number | undefined, fromY: number | undefined],
  [toX: number | undefined, toY: number | undefined]
];

const EMPTY_SELECTION_COORDINATES: SelectionCoordinates = [
  [undefined, undefined],
  [undefined, undefined],
];
const EMPTY_STYLE = {
  "--desktop-selection-display": "none",
} as CSSProperties;

// @todo handle draggable icons
export const Desktop: FunctionComponent<{}> = () => {
  const [state, dispatch] = useContext(StateContext);

  const [selectionCoordinates, setSelectionCoordinates] =
    useState<SelectionCoordinates>(EMPTY_SELECTION_COORDINATES);

  const style = useMemo<CSSProperties>(() => {
    const [[fromX, fromY], [toX, toY]] = selectionCoordinates;

    if (
      fromX === undefined ||
      fromY === undefined ||
      toX === undefined ||
      toY === undefined
    ) {
      return EMPTY_STYLE;
    }

    return {
      "--desktop-selection-display": "block",
      "--desktop-selection-height": `${Math.abs(toY - fromY)}px`,
      "--desktop-selection-left": `${Math.min(toX, fromX)}px`,
      "--desktop-selection-top": `${Math.min(toY, fromY)}px`,
      "--desktop-selection-width": `${Math.abs(toX - fromX)}px`,
    } as CSSProperties;
  }, [selectionCoordinates]);

  const onPointerMove = useCallback(({ clientX, clientY }: any) => {
    setSelectionCoordinates(([[fromX, fromY]]) =>
      fromX === undefined || fromY === undefined
        ? EMPTY_SELECTION_COORDINATES
        : [
            [fromX, fromY],
            [clientX, clientY],
          ]
    );
  }, []);
  const onPointerUp = useCallback(() => {
    setSelectionCoordinates(EMPTY_SELECTION_COORDINATES);

    document.removeEventListener("pointermove", onPointerMove);
    document.removeEventListener("pointerup", onPointerUp);
    document.body.style.userSelect = "auto";
  }, [onPointerMove]);

  useEffect(
    () => () => {
      document.removeEventListener("pointermove", onPointerMove);
      document.removeEventListener("pointerup", onPointerUp);
    },
    [onPointerMove, onPointerUp]
  );

  return (
    <nav
      className={styles.root}
      onPointerDown={({ clientX, clientY, currentTarget, target }) => {
        // only handle clicks on the background (not on icons)
        if (target === currentTarget) {
          setSelectionCoordinates([
            [clientX, clientY],
            [clientX, clientY],
          ]);

          document.addEventListener("pointermove", onPointerMove);
          document.addEventListener("pointerup", onPointerUp);
          // prevent highlighting text dragged across
          document.body.style.userSelect = "none";
          // clear any highlighted text
          window.getSelection()?.removeAllRanges();
        }
      }}
      style={style}>
      {state.desktop.map((id) => {
        const obj = [...state.applications, ...state.files].find(
          (o) => o.id === id
        );

        if (!obj) {
          return null;
        }

        const isApplication = "windowIds" in obj;
        const icon = state.types[isApplication ? id : obj.type].icon;

        return (
          <button
            className={styles.button}
            draggable
            key={id}
            onDoubleClick={() => {
              dispatch({
                payload: {
                  ids: [id],
                  type: isApplication ? "application" : "file",
                },
                type: "OPEN",
              });
            }}
            title={obj.title}
            type="button">
            <div aria-hidden className={styles.icon} role="presentation">
              {icon}
            </div>
            <label className={styles.label}>{obj.title}</label>
          </button>
        );
      })}
    </nav>
  );
};
