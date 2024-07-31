import { ComponentPropsWithoutRef } from "react";

export const getChildMenuitemToFocus = (
  element: HTMLElement | null
): HTMLElement | undefined => {
  const menuitems = Array.from<HTMLElement>(
    element?.querySelectorAll(
      ':scope > [role^="menuitem"], :scope > [role="menu"] > [role^="menuitem"]'
    ) ?? []
  );

  return (
    menuitems.find((menuitem) =>
      menuitem.matches(':not([aria-checked="true"], [aria-disabled="true"])')
    ) ?? menuitems[0]
  );
};

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
