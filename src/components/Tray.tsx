import { type FunctionComponent, type PropsWithChildren } from "react";

export const Tray: FunctionComponent<PropsWithChildren> = ({ children }) => (
  <aside className="tray">{children}</aside>
);
