import { DependencyList, RefObject, useEffect } from "react";

export const useFocus = ({
  deps,
  ref,
  selector,
}: {
  deps: DependencyList;
  ref: RefObject<HTMLElement>;
  selector?: Parameters<ParentNode["querySelector"]>[0];
}): void => {
  useEffect(
    () => {
      if (deps.every(Boolean) && ref.current) {
        const element = (
          selector ? ref.current.querySelector(selector) : ref.current
        ) as HTMLElement;

        if (element && !element.contains(document.activeElement)) {
          element.focus();
        }
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [...deps]
  );
};
