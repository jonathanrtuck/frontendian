import { forwardRef } from "react";

import { IconComponent } from "@/types";

export const Resize: IconComponent = forwardRef((props, ref) => (
  <svg
    {...props}
    ref={ref}
    version="1.1"
    viewBox="0 0 64 64"
    xmlns="http://www.w3.org/2000/svg">
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
));

Resize.displayName = "Resize";
