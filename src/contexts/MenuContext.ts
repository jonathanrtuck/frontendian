import { createContext } from "react";

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
