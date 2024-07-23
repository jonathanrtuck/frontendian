import { DependencyList, ReactElement, useContext, useEffect } from "react";

import { MenuItemProps } from "components/MenuItem";
import { MenuItemsContext } from "contexts";

export const useMenuItems = (
  menuItems: ReactElement<MenuItemProps>[],
  deps: DependencyList
) => {
  const setMenuItems = useContext(MenuItemsContext);

  useEffect(
    () => {
      setMenuItems(menuItems);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    deps
  );
};
