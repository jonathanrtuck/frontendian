import clsx from "clsx";
import { forwardRef, SVGAttributes } from "react";

import { Resize } from "@/icons";
import { useStore } from "@/store";

import styles from "./ResizeHandle.module.css";

// @see https://github.com/react-grid-layout/react-resizable?tab=readme-ov-file#functional-components
export const ResizeHandle = forwardRef<
  SVGSVGElement,
  SVGAttributes<SVGSVGElement> & { handleAxis?: unknown } & unknown
>(({ className, handleAxis, ...props }, ref) => {
  const theme = useStore((state) => state.theme);

  return (
    <Resize
      {...props}
      className={clsx(className, styles.root)}
      ref={ref}
      themeId={theme.id}
    />
  );
});

ResizeHandle.displayName = "ResizeHandle";
