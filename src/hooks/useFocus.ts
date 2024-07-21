import { DependencyList, RefObject, useEffect } from "react";

export const useFocus = (
  ref: RefObject<HTMLElement>,
  deps: DependencyList
): void => {
  useEffect(
    () => {
      if (
        deps.every(Boolean) &&
        ref.current &&
        !ref.current.contains(document.activeElement)
      ) {
        ref.current.focus();
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [...deps]
  );
};
