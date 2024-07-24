import { createContext, Dispatch, ReactElement, SetStateAction } from "react";

import { MenuItemProps } from "@/components/MenuItem";

export const MenuItemsContext = createContext<
  Dispatch<SetStateAction<ReactElement<MenuItemProps>[]>>
>(() => {});
