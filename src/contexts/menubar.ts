import { createContext, Dispatch, SetStateAction } from "react";

import { Menubaritem } from "components/Menubar";

export const MenubarContext = createContext<
  Dispatch<SetStateAction<Menubaritem[]>>
>(() => []);
