import clsx from "clsx";
import { forwardRef, SVGAttributes } from "react";

import { Resize } from "@/icons";

// @see https://github.com/react-grid-layout/react-resizable?tab=readme-ov-file#functional-components
export const ResizeHandle = forwardRef<
  SVGSVGElement,
  SVGAttributes<SVGSVGElement> & { handleAxis?: unknown } & unknown
>(({ className, handleAxis, ...props }, ref) => (
  <Resize
    {...props}
    aria-hidden
    className={clsx(className, "resize-handle")}
    ref={ref}
  />
));

ResizeHandle.displayName = "ResizeHandle";
