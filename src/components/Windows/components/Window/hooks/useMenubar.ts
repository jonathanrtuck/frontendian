import { useContext, useEffect } from "react";

import { Menubaritem } from "components/Menubar";
import { MenubarContext } from "contexts";

export const useMenubar = (menuitems: Menubaritem[]) => {
  const setMenuitems = useContext(MenubarContext);

  useEffect(() => {
    setMenuitems(menuitems);
  }, [menuitems, setMenuitems]);
};
