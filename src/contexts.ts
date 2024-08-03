import { createContext, Dispatch, RefObject, SetStateAction } from "react";

import { Window } from "@/types";

export const MenuContext = createContext<{
  isActive: boolean;
  isFocusWithin: boolean;
  isPointer: boolean;
  isTop: boolean;
  orientation: "horizontal" | "vertical";
  setIsActive: Dispatch<SetStateAction<boolean>>;
}>({
  isActive: false,
  isFocusWithin: false,
  isPointer: false,
  isTop: false,
  orientation: "horizontal",
  setIsActive: () => {},
});

export const MenuitemContext = createContext<{
  collapse(): void;
}>({
  collapse: () => {},
});

export const WindowContext = createContext<
  Window & {
    inert: boolean;
    menubarRef: RefObject<HTMLMenuElement>;
  }
>(null as any);
