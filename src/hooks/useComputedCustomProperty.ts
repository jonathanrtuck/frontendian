import { useMemo } from "react";

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
