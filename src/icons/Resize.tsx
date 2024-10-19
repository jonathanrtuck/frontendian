import { forwardRef } from "react";

import { IconComponent } from "@/types";

export const Resize: IconComponent = forwardRef(
  ({ themeId, ...props }, ref) => {
    switch (themeId) {
      case "theme-beos":
        return (
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
        );
      case "theme-mac-os-classic":
        return (
          <svg
            {...props}
            ref={ref}
            version="1.1"
            viewBox="0 0 64 64"
            xmlns="http://www.w3.org/2000/svg">
            <g strokeWidth="4">
              <line
                stroke="var(--color--highlight)"
                x1="12"
                x2="38"
                y1="38"
                y2="12"
              />
              <line
                stroke="var(--color--lowlight)"
                x1="16"
                x2="42"
                y1="42"
                y2="16"
              />
              <line
                stroke="var(--color--highlight)"
                x1="20"
                x2="46"
                y1="46"
                y2="20"
              />
              <line
                stroke="var(--color--lowlight)"
                x1="24"
                x2="50"
                y1="50"
                y2="24"
              />
              <line
                stroke="var(--color--highlight)"
                x1="28"
                x2="54"
                y1="54"
                y2="28"
              />
              <line
                stroke="var(--color--lowlight)"
                x1="32"
                x2="58"
                y1="58"
                y2="32"
              />
            </g>
          </svg>
        );
      default:
        return null;
    }
  }
);

Resize.displayName = "Resize";
