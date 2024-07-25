import { createContext, Dispatch, ReactElement, SetStateAction } from "react";

import { MenuitemProps } from "@/components/Menuitem";

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

export const MenuitemsContext = createContext<
  Dispatch<SetStateAction<ReactElement<MenuitemProps>[]>>
>(() => {});
