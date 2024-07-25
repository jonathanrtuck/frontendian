import { createContext, Dispatch, ReactElement, SetStateAction } from "react";

import { MenuItemProps } from "@/components/MenuItem";

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

export const MenuItemsContext = createContext<
  Dispatch<SetStateAction<ReactElement<MenuItemProps>[]>>
>(() => {});
