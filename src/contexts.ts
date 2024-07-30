import { createContext, RefObject } from "react";

import { Window } from "@/types";

export const MenuContext = createContext<MenuContextValue>({
  bar: false,
  close: () => {},
  horizontal: false,
  vertical: false,
});

export type MenuContextValue = {
  bar: boolean;
  close(): void;
  horizontal: boolean;
  vertical: boolean;
};

export const MenuitemContext = createContext<MenuitemContextValue>({
  close: () => {},
  expanded: false,
});

export type MenuitemContextValue = {
  close(): void;
  expanded: boolean;
};

export const WindowContext = createContext<WindowContextValue>(null as any);

export type WindowContextValue = Window & {
  menubarRef: RefObject<HTMLElement>;
};
