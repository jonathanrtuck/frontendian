import {
  DependencyList,
  ReactElement,
  RefObject,
  useContext,
  useEffect,
  useLayoutEffect,
  useMemo,
  useState,
} from "react";

import { MenuItemProps } from "@/components/MenuItem";
import { MenuItemsContext } from "@/contexts";

type Dimensions = { height: number; width: number };

export const useClock = (): Date => {
  const [date, setDate] = useState<Date>(new Date());

  useEffect(() => {
    let animationFrameRequest: ReturnType<typeof requestAnimationFrame>;

    // @recursive
    const tick = () => {
      setDate(new Date());

      animationFrameRequest = requestAnimationFrame(tick);
    };

    animationFrameRequest = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(animationFrameRequest);
    };
  }, []);

  return date;
};

// get the current value of a css variable in px
export const useComputedCustomProperty = (property: string): number =>
  useMemo<number>(() => {
    const fontSize = parseInt(
      getComputedStyle(document.documentElement).fontSize,
      10
    );
    const value = getComputedStyle(document.documentElement).getPropertyValue(
      property
    );

    // @todo handle other css units as needed (e.g. `%`, `em`, `vw`, etc…)
    if (value.endsWith("rem")) {
      return parseFloat(value) * fontSize;
    }

    // px values
    return parseFloat(value);
  }, [property]);

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
    deps
  );

  return dimensions;
};

export const useFocus = ({
  deps,
  ref,
  selector,
}: {
  deps: boolean[];
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
    deps
  );
};

export const useMenuItems = (
  menuItems: ReactElement<MenuItemProps>[],
  deps: DependencyList
) => {
  const setMenuItems = useContext(MenuItemsContext);

  useLayoutEffect(
    () => {
      setMenuItems(menuItems);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    deps
  );
};
