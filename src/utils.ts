import { CSSProperties } from "react";

export const allowSelection = (element = document.body): void => {
  element.style.userSelect = "";
  // and for safari
  element.style.removeProperty("-webkit-user-select");
};

export const getInteractionPosition = (
  e: MouseEvent | TouchEvent
): [clientX: number, clientY: number] => {
  const { clientX, clientY } = "touches" in e ? e.touches[0] : e;

  return [clientX, clientY];
};

export const preventSelection = (element = document.body): void => {
  element.style.userSelect = "none";
  // and for safari
  element.style.setProperty("-webkit-user-select", "none");
};

export const removeStyles = (
  element: HTMLElement | null,
  keys: string[]
): void => {
  if (!element) {
    return;
  }

  keys.forEach((key) => {
    element.style.removeProperty(key);
  });
};

export const setStyles = (
  element: HTMLElement | null,
  obj: CSSProperties
): void => {
  if (!element) {
    return;
  }

  Object.entries(obj).forEach(([key, value]) => {
    element.style.setProperty(key, value);
  });
};
