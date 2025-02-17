import type { Theme, Window } from "@/types";
import type { RefObject } from "react";
import { createContext, createRef } from "react";

export const MenuContext = createContext<{
  inactivate(): void;
  isActive: boolean;
  isFocusWithin: boolean;
  isTop: boolean;
  orientation: "horizontal" | "vertical";
}>({
  inactivate: () => {},
  isActive: false,
  isFocusWithin: false,
  isTop: true,
  orientation: "horizontal",
});

export const MenuitemContext = createContext<{
  collapse(): void;
  isExpanded: boolean;
  topButtonRef: RefObject<HTMLElement | null>;
}>({
  collapse: () => {},
  isExpanded: false,
  topButtonRef: createRef(),
});

export const ThemeContext = createContext<Theme>("beos");

export const WindowContext = createContext<Partial<Pick<Window, "id">>>({
  id: undefined,
});
