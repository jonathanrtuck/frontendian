import { forwardRef, SVGAttributes } from "react";

export const Resize = forwardRef<SVGSVGElement, SVGAttributes<SVGSVGElement>>(
  (props, ref) => (
    <svg
      ref={ref}
      version="1.1"
      viewBox="0 0 64 64"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <circle cx="60" cy="12" fill="currentColor" r="4" />
      <circle cx="44" cy="28" fill="currentColor" r="4" />
      <circle cx="60" cy="28" fill="currentColor" r="4" />
      <circle cx="28" cy="44" fill="currentColor" r="4" />
      <circle cx="44" cy="44" fill="currentColor" r="4" />
      <circle cx="60" cy="44" fill="currentColor" r="4" />
      <circle cx="12" cy="60" fill="currentColor" r="4" />
      <circle cx="28" cy="60" fill="currentColor" r="4" />
      <circle cx="44" cy="60" fill="currentColor" r="4" />
      <circle cx="60" cy="60" fill="currentColor" r="4" />
    </svg>
  )
);
