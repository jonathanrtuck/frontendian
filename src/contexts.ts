import { Window } from "@/types";
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

export const WindowContext = createContext<
  Window & {
    menubarRef: RefObject<HTMLMenuElement | null>;
  }
>({
  collapsed: false,
  focused: false,
  height: 0,
  hidden: true,
  id: "",
  left: 0,
  menubarRef: createRef(),
  resizable: false,
  scrollable: false,
  title: "",
  titlebarLeft: 0,
  top: 0,
  width: 0,
  zoomed: false,
});
