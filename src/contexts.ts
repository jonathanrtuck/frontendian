import { createContext, createRef, RefObject } from "react";

import { Window } from "@/types";

export const MenuContext = createContext<{
  inactivate(): void;
  isActive: boolean;
  isFocusWithin: boolean;
  isPointer: boolean;
  isTop: boolean;
  orientation: "horizontal" | "vertical";
}>({
  inactivate: () => {},
  isActive: false,
  isFocusWithin: false,
  isPointer: false,
  isTop: false,
  orientation: "horizontal",
});

export const MenuitemContext = createContext<{
  collapse(): void;
  isExpanded: boolean;
  topButtonRef: RefObject<HTMLElement>;
}>({
  collapse: () => {},
  isExpanded: false,
  topButtonRef: createRef(),
});

export const WindowContext = createContext<
  Window & {
    inert: boolean;
    menubarRef: RefObject<HTMLMenuElement>;
  }
>(null as any);
