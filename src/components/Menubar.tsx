import { Menu } from "@/components";
import { type FunctionComponent, type PropsWithChildren } from "react";

export const Menubar: FunctionComponent<PropsWithChildren> = ({ children }) => (
  <Menu bar horizontal>
    {children}
  </Menu>
);
