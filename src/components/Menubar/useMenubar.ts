import { useContext, useEffect } from "react";

import { MenubarContext } from "./context";
import { Menubaritem } from "./types";

export const useMenubar = (menuitems: Menubaritem[]) => {
  const setMenuitems = useContext(MenubarContext);

  useEffect(() => {
    setMenuitems(menuitems);
  }, [menuitems, setMenuitems]);
};
