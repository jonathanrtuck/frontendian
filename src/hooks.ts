import { RefObject, useEffect, useMemo, useState } from "react";

import { useStore } from "@/store";
import { Pixels, Theme } from "@/types";

type CssModule = {
  readonly [key: string]: string;
};

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

// get the current value of a css variable in px
export const useComputedCustomProperty = (
  element: HTMLElement | null,
  property: string
): Pixels => {
  const theme = useStore((state) => state.theme);

  return useMemo<Pixels>(() => {
    if (!element) {
      return 0;
    }

    const value = getComputedStyle(element).getPropertyValue(property);

    if (!value) {
      return 0;
    }

    const fontSize = parseInt(
      getComputedStyle(document.documentElement).fontSize,
      10
    );

    // handle other css units as needed (e.g. `%`, `em`, `vw`, etc…)
    if (value.endsWith("rem")) {
      return parseFloat(value) * fontSize;
    }

    // px values
    return parseFloat(value);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [element, property, theme]);
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

export const useStyles = (obj: Record<Theme["id"], CssModule>): CssModule => {
  const theme = useStore((state) => state.theme);

  return obj[theme.id];
};
