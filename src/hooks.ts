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
    let interval: ReturnType<typeof setInterval>;
    // first use timeout in order to get second tick interval to align with system clock
    const timeout = setTimeout(() => {
      interval = setInterval(() => {
        setDate(new Date());
      }, 1000);

      setDate(new Date());
    }, 1000 - new Date().getMilliseconds());

    return () => {
      clearTimeout(timeout);
      clearInterval(interval);
    };
  }, []);

  return date;
};

// @todo handle other css units as needed
export const useComputedCustomProperty = (property: string): number =>
  useMemo<number>(() => {
    const fontSize = parseInt(
      getComputedStyle(document.documentElement).fontSize,
      10
    );
    const value = getComputedStyle(document.documentElement).getPropertyValue(
      property
    );

    if (value.endsWith("rem")) {
      return parseFloat(value) * fontSize;
    }

    return 0;
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
    [...deps]
  );

  return dimensions;
};

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
