"use client";

import type { RefObject } from "react";
import { useEffect } from "react";

export const useFocus = ({
  deps,
  ref,
  selector,
}: {
  deps: boolean[];
  ref: RefObject<HTMLElement | null>;
  selector?: string;
}): void =>
  useEffect(
    () => {
      if (deps.every(Boolean) && ref.current) {
        const element = selector
          ? ref.current.querySelector<HTMLElement>(selector)
          : ref.current;

        if (element && !element.contains(document.activeElement)) {
          element.focus();
        }
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    deps
  );
