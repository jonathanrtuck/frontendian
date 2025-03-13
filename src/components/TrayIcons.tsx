import { type FunctionComponent, type PropsWithChildren } from "react";

export const TrayIcons: FunctionComponent<PropsWithChildren> = ({
  children,
}) => <menu className="tray-icons">{children}</menu>;
