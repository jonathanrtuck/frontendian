import { FunctionComponent } from "react";

import { useStore, useStyles } from "@/hooks";
import { File } from "@/icons";
import { IconComponent } from "@/types";

export const Icon: FunctionComponent<{
  Component?: IconComponent;
  onClick(): void;
  title: string;
}> = ({ Component = File, onClick, title }) => {
  const theme = useStore((state) => state.theme);
  const styles = useStyles("Icon");

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
