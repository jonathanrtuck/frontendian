import { forwardRef, SVGAttributes } from "react";

import { Resize } from "@/icons";

// @see https://github.com/react-grid-layout/react-resizable?tab=readme-ov-file#functional-components
export const ResizeHandle = forwardRef<
  SVGSVGElement,
  SVGAttributes<SVGSVGElement> & { handleAxis?: unknown } & unknown
>(({ handleAxis, ...props }, ref) => <Resize {...props} ref={ref} />);

ResizeHandle.displayName = "ResizeHandle";
