import { ComponentPropsWithoutRef } from "react";

/* @todo
export const getChildMenuitems = (element: HTMLElement | null): HTMLElement[] =>
  Array.from<HTMLElement>(
    element?.querySelectorAll(
      ':scope > [role^="menuitem"], :scope > [role="menu"] > [role^="menuitem"]'
    ) ?? []
  );

export const getSiblingMenuitems = (
  element: HTMLElement | null
): HTMLElement[] =>
  element
    ? getChildMenuitems(
        element.closest('[role="menubar"], [role="menu"]')
      ).filter((menuitem) => menuitem !== element)
    : [];
*/

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
