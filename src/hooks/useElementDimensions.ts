import { DependencyList, RefObject, useLayoutEffect, useState } from "react";

type Dimensions = { height: number; width: number };

export const useElementDimensions = (
  ref: RefObject<HTMLElement>,
  deps: DependencyList
): Dimensions => {
  const [dimensions, setDimensions] = useState<Dimensions>({
    height: 0,
    width: 0,
  });

  useLayoutEffect(
    () => {
      if (ref.current) {
        setDimensions({
          height: ref.current.offsetHeight,
          width: ref.current.offsetWidth,
        });
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [...deps]
  );

  return dimensions;
};
