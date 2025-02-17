"use client";

import type { Coordinates } from "@/types";
import type { RefObject } from "react";
import { useCallback, useEffect, useState } from "react";

type Selection = {
  from?: Coordinates;
  to?: Coordinates;
};

const setUserSelect = (userSelect: boolean): void => {
  if (userSelect) {
    document.body.style.userSelect = "";
    document.body.style.removeProperty("-webkit-user-select");
  } else {
    document.body.style.userSelect = "none";
    document.body.style.setProperty("-webkit-user-select", "none");
  }
};

export const useSelection = (ref: RefObject<HTMLElement | null>): Selection => {
  const [selection, setSelection] = useState<Selection>({});
  const onMouseMove = useCallback(
    ({ clientX, clientY }: MouseEvent) =>
      setSelection((prevState) => ({
        ...prevState,
        to: {
          x: clientX,
          y: clientY,
        },
      })),
    []
  );
  const onMouseUp = useCallback(() => {
    document.removeEventListener("mousemove", onMouseMove);
    document.removeEventListener("mouseup", onMouseUp);
    setUserSelect(true);
    setSelection({});
  }, [onMouseMove]);
  const onMouseDown = useCallback(
    ({
      button,
      buttons,
      clientX,
      clientY,
      currentTarget,
      target,
    }: MouseEvent) => {
      if ((button === 0 || buttons === 1) && target === currentTarget) {
        document.addEventListener("mousemove", onMouseMove);
        document.addEventListener("mouseup", onMouseUp);
        setUserSelect(false);
        setSelection({
          from: {
            x: clientX,
            y: clientY,
          },
        });
      }
    },
    [onMouseMove, onMouseUp]
  );

  useEffect(() => {
    const element = ref.current;

    if (element) {
      element.addEventListener("mousedown", onMouseDown);

      return () => {
        document.removeEventListener("mouseup", onMouseUp);
        document.removeEventListener("mousemove", onMouseMove);
        element.removeEventListener("mousedown", onMouseDown);
        setUserSelect(true);
      };
    }
  }, [onMouseDown, onMouseMove, onMouseUp, ref]);

  return selection;
};
