import {
  CSSProperties,
  FunctionComponent,
  useCallback,
  useContext,
  useEffect,
  useLayoutEffect,
  useRef,
} from "react";

import { File } from "icons";
import { StateContext } from "state";
import {
  allowSelection,
  getInteractionPosition,
  preventSelection,
  removeStyles,
  setStyles,
} from "utils";

import styles from "./Desktop.module.css";

// @todo handle draggable icons
export const Desktop: FunctionComponent<{}> = () => {
  const [state, dispatch] = useContext(StateContext);

  const rootRef = useRef<HTMLElement>(null);

  const selectingFromRef = useRef<
    [clientX: number, clientY: number] | undefined
  >(undefined);

  const onMouseDown = useCallback((e: MouseEvent) => {
    // only handle left clicks on the background (not on icons)
    if (e.button !== 0 || e.buttons !== 1 || e.target !== e.currentTarget) {
      return;
    }

    const [clientX, clientY] = getInteractionPosition(e);

    selectingFromRef.current = [clientX, clientY];
    // clear any highlighted text
    window.getSelection()?.removeAllRanges();
    // prevent highlighting text dragged across
    preventSelection();
  }, []);
  const onMouseMove = useCallback((e: MouseEvent) => {
    if (!selectingFromRef.current) {
      return;
    }

    const [clientX, clientY] = getInteractionPosition(e);
    const [fromX, fromY] = selectingFromRef.current;

    setStyles(rootRef.current, {
      "--desktop-selection-display": "block",
      "--desktop-selection-height": `${Math.abs(clientY - fromY)}px`,
      "--desktop-selection-left": `${Math.min(clientX, fromX)}px`,
      "--desktop-selection-top": `${Math.min(clientY, fromY)}px`,
      "--desktop-selection-width": `${Math.abs(clientX - fromX)}px`,
    } as CSSProperties);
  }, []);
  const onMouseUp = useCallback(() => {
    if (!selectingFromRef.current) {
      return;
    }

    selectingFromRef.current = undefined;
    removeStyles(rootRef.current, [
      "--desktop-selection-height",
      "--desktop-selection-left",
      "--desktop-selection-top",
      "--desktop-selection-width",
    ]);
    setStyles(rootRef.current, {
      "--desktop-selection-display": "none",
    } as CSSProperties);
    allowSelection();
  }, []);

  useEffect(() => {
    const rootElement = rootRef.current;

    if (rootElement) {
      rootElement.addEventListener("mousedown", onMouseDown);

      return () => {
        rootElement.removeEventListener("mousedown", onMouseDown);
      };
    }
  }, [onMouseDown]);

  useEffect(() => {
    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);

    return () => {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onMouseUp);
    };
  }, [onMouseMove, onMouseUp]);

  useLayoutEffect(() => {
    setStyles(rootRef.current, {
      "--desktop-selection-display": "none",
    } as CSSProperties);
  }, []);

  return (
    <nav className={styles.root} ref={rootRef}>
      {state.desktop.map((id) => {
        const obj = [...state.applications, ...state.files].find(
          (o) => o.id === id
        );

        if (!obj) {
          return null;
        }

        const isApplication = "windowIds" in obj;
        const icon = isApplication
          ? obj.icon
          : state.types[obj.type]?.icon ?? <File />;

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
            tabIndex={0}
            title={obj.title}
            type="button">
            <span aria-hidden className={styles.icon} role="presentation">
              {icon}
            </span>
            <label className={styles.label}>{obj.title}</label>
          </button>
        );
      })}
    </nav>
  );
};
