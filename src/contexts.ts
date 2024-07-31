import { createContext, RefObject } from "react";

import { Window } from "@/types";

export const MenubarContext = createContext<{
  isFocusWithin: boolean;
}>({
  isFocusWithin: false,
});

export const WindowContext = createContext<
  Window & {
    menubarRef: RefObject<HTMLMenuElement>;
  }
>(null as any);
