"use client";

import { type RefObject, useLayoutEffect, useState } from "react";

export const useOverflow = (
  ref: RefObject<HTMLElement | null>
): [horizontal: boolean, vertical: boolean] => {
  const [horizontal, setHorizontal] = useState<boolean>(false);
  const [vertical, setVertical] = useState<boolean>(false);

  useLayoutEffect(() => {
    const element = ref.current;
    const parent = element?.parentElement;

    if (!element || !parent) {
      return;
    }

    const setOverflow = () => {
      setHorizontal(element.scrollWidth > parent.clientWidth);
      setVertical(element.scrollHeight > parent.clientHeight);
    };
    const resizeObserver = new ResizeObserver(setOverflow);

    resizeObserver.observe(parent);
    resizeObserver.observe(element);
    setOverflow();

    return () => {
      resizeObserver.unobserve(parent);
      resizeObserver.unobserve(element);
    };
  }, [ref]);

  return [horizontal, vertical];
};
