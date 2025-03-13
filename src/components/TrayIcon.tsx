import { type IconComponent } from "@/types";
import { type FunctionComponent } from "react";

export const TrayIcon: FunctionComponent<{ Icon: IconComponent }> = ({
  Icon,
}) => (
  <li className="tray-icon">
    <Icon />
  </li>
);
