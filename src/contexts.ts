import { DEFAULT_WINDOW } from "@/constants";
import { Window } from "@/types";
import type { RefObject } from "react";
import { createContext, createRef } from "react";

export const MenuContext = createContext<{
  hasPopup: boolean;
  inactivate(): void;
  isActive: boolean;
  isFocusWithin: boolean;
  isPointer: boolean;
  isTop: boolean;
  orientation: "horizontal" | "vertical";
}>({
  hasPopup: false,
  inactivate: () => {},
  isActive: false,
  isFocusWithin: false,
  isPointer: false,
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

export const WindowContext = createContext<
  Window & {
    menubarRef: RefObject<HTMLMenuElement | null>;
  }
>({
  ...DEFAULT_WINDOW,
  menubarRef: createRef(),
});
