import { createContext, RefObject } from "react";

import { Window } from "@/types";

export const MenuContext = createContext<{
  isBar: boolean;
  isHorizontal: boolean;
  isOpen: boolean;
  isVertical: boolean;
}>({
  isBar: false,
  isHorizontal: false,
  isOpen: false,
  isVertical: false,
});

export const WindowContext = createContext<
  Window & {
    menubarRef: RefObject<HTMLElement>;
  }
>(null as any);
