"use client";

import type { RefObject } from "react";
import { useEffect, useState } from "react";

export const useClock = (): Date => {
  const [date, setDate] = useState<Date>(new Date());

  useEffect(() => {
    let animationFrameRequest: ReturnType<typeof requestAnimationFrame>;

    // @recursive
    const tick = () => {
      // only update state every second
      setDate((prevState) => {
        const now = new Date();

        return now.getSeconds() !== prevState.getSeconds() ? now : prevState;
      });

      animationFrameRequest = requestAnimationFrame(tick);
    };

    animationFrameRequest = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(animationFrameRequest);
    };
  }, []);

  return date;
};

export const useFocus = ({
  deps,
  ref,
  selector,
}: {
  deps: boolean[];
  ref: RefObject<HTMLElement | null>;
  selector?: Parameters<ParentNode["querySelector"]>[0];
}): void => {
  useEffect(
    () => {
      if (deps.every(Boolean) && ref.current) {
        const element: HTMLElement | null = selector
          ? ref.current.querySelector(selector)
          : ref.current;

        if (element && !element.contains(document.activeElement)) {
          element.focus();
        }
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    deps
  );
};
