import { ComponentPropsWithoutRef, UIEvent } from "react";

import { useStore } from "@/store";
import { Theme } from "@/types";

export const getTargetElement = (event: UIEvent): HTMLElement | null =>
  event.target instanceof HTMLElement ? event.target : null;

export const getTitle = (obj: {
  title: string | ((theme: Theme) => string);
}): string =>
  typeof obj.title === "function"
    ? obj.title(useStore.getState().theme)
    : obj.title;

export const getUrl = (obj: {
  url: string | ((theme: Theme) => string);
}): string =>
  typeof obj.url === "function" ? obj.url(useStore.getState().theme) : obj.url;

export const removeProps = <T extends ComponentPropsWithoutRef<any>>(
  props: T,
  propNames: string[]
): T =>
  Object.entries(props).reduce<T>((acc, [key, value]) => {
    if (!propNames.includes(key)) {
      acc[key as keyof T] = value;
    }

    return acc;
  }, {} as T);
