import { createContext, createRef, RefObject } from "react";

import { DEFAULT_WINDOW } from "@/constants";
import { Window } from "@/types";

export type MenuContextType = {
  inactivate(): void;
  isActive: boolean;
  isFocusWithin: boolean;
  isPointer: boolean;
  isTop: boolean;
  orientation: "horizontal" | "vertical";
};

export const MenuContext = createContext<MenuContextType>({
  inactivate: () => {},
  isActive: false,
  isFocusWithin: false,
  isPointer: false,
  isTop: false,
  orientation: "horizontal",
});

export type MenuitemContextType = {
  collapse(): void;
  isExpanded: boolean;
  topButtonRef: RefObject<HTMLElement>;
};

export const MenuitemContext = createContext<MenuitemContextType>({
  collapse: () => {},
  isExpanded: false,
  topButtonRef: createRef(),
});

export type WindowContextType = Window & {
  menubarRef: RefObject<HTMLMenuElement>;
};

export const WindowContext = createContext<WindowContextType>({
  ...DEFAULT_WINDOW,
  menubarRef: createRef(),
});
