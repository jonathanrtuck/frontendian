"use client";

import { THEME_BEOS, THEME_MAC_OS_CLASSIC } from "@/themes";
import type { IconComponent } from "@/types";

export const Resize: IconComponent = ({ theme, ...props }) => (
  <svg
    {...props}
    version="1.1"
    viewBox="0 0 64 64"
    xmlns="http://www.w3.org/2000/svg">
    {theme?.id === THEME_BEOS.id && (
      <>
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
      </>
    )}
    {theme?.id === THEME_MAC_OS_CLASSIC.id && (
      <>
        <line
          stroke="var(--color--highlight)"
          strokeWidth="4"
          x1="12"
          x2="38"
          y1="38"
          y2="12"
        />
        <line
          stroke="var(--color--lowlight)"
          strokeWidth="4"
          x1="16"
          x2="42"
          y1="42"
          y2="16"
        />
        <line
          stroke="var(--color--highlight)"
          strokeWidth="4"
          x1="20"
          x2="46"
          y1="46"
          y2="20"
        />
        <line
          stroke="var(--color--lowlight)"
          strokeWidth="4"
          x1="24"
          x2="50"
          y1="50"
          y2="24"
        />
        <line
          stroke="var(--color--highlight)"
          strokeWidth="4"
          x1="28"
          x2="54"
          y1="54"
          y2="28"
        />
        <line
          stroke="var(--color--lowlight)"
          strokeWidth="4"
          x1="32"
          x2="58"
          y1="58"
          y2="32"
        />
      </>
    )}
  </svg>
);

Resize.displayName = "Resize";
