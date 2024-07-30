import { createContext, createRef, RefObject } from "react";

import { Window } from "@/types";

export const MenuContext = createContext<MenuContextValue>({
  bar: false,
  horizontal: false,
  ref: createRef(),
  vertical: false,
});

export type MenuContextValue = {
  bar: boolean;
  horizontal: boolean;
  ref: RefObject<HTMLMenuElement>;
  vertical: boolean;
};

export const MenuitemContext = createContext<MenuitemContextValue>({
  expanded: false,
});

export type MenuitemContextValue = {
  expanded: boolean;
};

export const WindowContext = createContext<WindowContextValue>(null as any);

export type WindowContextValue = Window & {
  menubarRef: RefObject<HTMLElement>;
};
