import { createContext, RefObject } from "react";

import { Window } from "@/types";

export const MenuContext = createContext<{
  isFocusWithin: boolean;
  isTop: boolean;
  orientation: "horizontal" | "vertical";
}>({
  isFocusWithin: false,
  isTop: false,
  orientation: "horizontal",
});

export const WindowContext = createContext<
  Window & {
    inert: boolean;
    menubarRef: RefObject<HTMLMenuElement>;
  }
>(null as any);
