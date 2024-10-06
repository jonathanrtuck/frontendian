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
            <g strokeWidth="3">
              <line
                stroke="var(--highlight-color)"
                x1="11"
                x2="43"
                y1="43"
                y2="11"
              />
              <line
                stroke="var(--lowlight-color)"
                x1="14"
                x2="46"
                y1="46"
                y2="14"
              />
              <line
                stroke="var(--highlight-color)"
                x1="17"
                x2="49"
                y1="49"
                y2="17"
              />
              <line
                stroke="var(--lowlight-color)"
                x1="20"
                x2="52"
                y1="52"
                y2="20"
              />
              <line
                stroke="var(--highlight-color)"
                x1="23"
                x2="55"
                y1="55"
                y2="23"
              />
              <line
                stroke="var(--lowlight-color)"
                x1="26"
                x2="58"
                y1="58"
                y2="26"
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
