import { createContext, Dispatch, SetStateAction } from "react";

import { Menubaritem } from "./types";

export const MenubarContext = createContext<
  Dispatch<SetStateAction<Menubaritem[]>>
>(() => []);
