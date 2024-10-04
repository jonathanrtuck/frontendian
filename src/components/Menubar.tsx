import {
  FunctionComponent,
  PropsWithChildren,
  useContext,
  useEffect,
} from "react";

import { Menu } from "@/components/Menu";
import { WindowContext } from "@/contexts";
import { useStore } from "@/store";

export type MenubarProps = PropsWithChildren;

export const Menubar: FunctionComponent<MenubarProps> = ({ children }) => {
  const { active, menubarRef } = useContext(WindowContext);

  const theme = useStore((state) => state.theme);

  useEffect(() => {
    if (!theme.components.menubar.windowed) {
      console.debug(children);
    }
  }, [children, theme]);

  if (theme.components.menubar.windowed) {
    return (
      <Menu
        bar
        className="menubar"
        draggable={false}
        horizontal
        inert={!active ? "" : undefined}
        ref={menubarRef}>
        {children}
      </Menu>
    );
  }

  return null;
};

Menubar.displayName = "Menubar";
