import { ComponentPropsWithoutRef } from "react";

export const removeProps = <T extends ComponentPropsWithoutRef<any>>(
  props: T,
  propNames: string[]
) =>
  Object.entries(props).reduce<T>((acc, [key, value]) => {
    if (!propNames.includes(key)) {
      acc[key as keyof T] = value;
    }

    return acc;
  }, {} as ComponentPropsWithoutRef<any>);
