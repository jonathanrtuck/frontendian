import { useContext, useEffect } from "react";

import { Menubaritem } from "components/Menubar";
import { MenubarContext } from "contexts";

export type { Menubaritem } from "components/Menubar";

export const useMenubar = (menuitems: Menubaritem[]) => {
  const setMenuitems = useContext(MenubarContext);

  useEffect(() => {
    setMenuitems(menuitems);
  }, [menuitems, setMenuitems]);
};
