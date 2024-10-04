import { FunctionComponent } from "react";

import { File } from "@/icons";
import { IconComponent } from "@/types";

export type IconProps = {
  Icon?: IconComponent;
  onClick(): void;
  title: string;
};

export const Icon: FunctionComponent<IconProps> = ({
  Icon = File,
  onClick,
  title,
}) => (
  <button
    className="icon"
    draggable
    onDoubleClick={onClick}
    tabIndex={0}
    title={title}
    type="button">
    <Icon aria-hidden className="icon__icon" />
    <span className="icon__title">{title}</span>
  </button>
);

Icon.displayName = "Icon";
