import { createContext, createRef, RefObject } from "react";

import { Window } from "@/types";

export type MenuContextValue = {
  inactivate(): void;
  isActive: boolean;
  isFocusWithin: boolean;
  isPointer: boolean;
  isTop: boolean;
  orientation: "horizontal" | "vertical";
};

export const MenuContext = createContext<MenuContextValue>({
  inactivate: () => {},
  isActive: false,
  isFocusWithin: false,
  isPointer: false,
  isTop: false,
  orientation: "horizontal",
});

export type MenuitemContextValue = {
  collapse(): void;
  isExpanded: boolean;
  topButtonRef: RefObject<HTMLElement>;
};

export const MenuitemContext = createContext<MenuitemContextValue>({
  collapse: () => {},
  isExpanded: false,
  topButtonRef: createRef(),
});

export type WindowContextValue = Window & {
  menubarRef: RefObject<HTMLMenuElement>;
};

export const WindowContext = createContext<WindowContextValue>(null as any);
