import { type RefObject, useEffect } from "react";

export const useFocus = ({
  deps,
  ref,
  selector,
}: {
  deps: boolean[];
  ref: RefObject<HTMLElement | null>;
  selector?: string;
}): void =>
  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    if (deps.every(Boolean) && ref.current) {
      const element = selector
        ? ref.current.querySelector<HTMLElement>(selector)
        : ref.current;

      if (element && !element.contains(document.activeElement)) {
        element.focus();
      }
    }
  }, deps);
