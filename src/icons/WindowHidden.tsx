import {
  forwardRef,
  FunctionComponent,
  RefAttributes,
  SVGAttributes,
} from "react";

export const WindowHidden: FunctionComponent<
  RefAttributes<SVGSVGElement> &
    SVGAttributes<SVGSVGElement> & { handleAxis?: any }
> = forwardRef(({ handleAxis, ...props }, ref) => (
  <svg
    ref={ref}
    version="1.1"
    viewBox="-4 -4 64 64"
    xmlns="http://www.w3.org/2000/svg"
    {...props}>
    <path d="M0 0V12H32V0H0z" fill="#989898" />
    <path d="M0 12V56H52V12H0z" fill="#c8c8c8" />
    <path d="M4 52V4H32V12H52V8H36V0H0V52H4z" fill="#787878" />
    <path d="M0 56H52V12H48V52H0V56z" fill="#000000" />
    <path d="M32 4V8H36V4H32z" fill="#000000" />
  </svg>
));
