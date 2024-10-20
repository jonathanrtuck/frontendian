import { FunctionComponent } from "react";

import { useStyles } from "@/hooks";
import { File } from "@/icons";
import { useStore } from "@/store";
import { IconComponent } from "@/types";

import stylesBeos from "./Icon.beos.module.css";
import stylesMacOsClassic from "./Icon.mac-os-classic.module.css";

export type IconProps = {
  Component?: IconComponent;
  onClick(): void;
  title: string;
};

export const Icon: FunctionComponent<IconProps> = ({
  Component = File,
  onClick,
  title,
}) => {
  const theme = useStore((state) => state.theme);

  const styles = useStyles({
    "theme-beos": stylesBeos,
    "theme-mac-os-classic": stylesMacOsClassic,
  });

  return (
    <button
      className={styles.root}
      draggable
      onDoubleClick={onClick}
      tabIndex={0}
      title={title}
      type="button">
      <Component aria-hidden className={styles.icon} theme={theme} />
      <span className={styles.title}>{title}</span>
    </button>
  );
};

Icon.displayName = "Icon";
