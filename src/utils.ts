import { ComponentPropsWithoutRef, UIEvent } from "react";

export const getTargetElement = (event: UIEvent): HTMLElement | null =>
  event.target instanceof HTMLElement ? event.target : null;

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
