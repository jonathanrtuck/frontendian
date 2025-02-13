"use client";

import { ThemeIdContext } from "@/contexts";
import type { IconComponent } from "@/types";
import { useContext, useId } from "react";

export const FileManagerIcon: IconComponent = (props) => {
  const themeId = useContext(ThemeIdContext);
  const id = useId();

  return (
    <svg
      {...props}
      version="1.1"
      viewBox="0 0 64 64"
      xmlns="http://www.w3.org/2000/svg">
      {themeId === "theme-beos" && (
        <>
          <defs>
            <linearGradient
              gradientUnits="userSpaceOnUse"
              id={`${id}-0`}
              x1="102.6"
              x2="102.74"
              y1="8.5"
              y2="47.07">
              <stop offset="0" stopColor="#face79" />
              <stop offset="1" stopColor="#bc4105" />
            </linearGradient>
            <linearGradient
              gradientUnits="userSpaceOnUse"
              id={`${id}-1`}
              x1="103.24"
              x2="103.39"
              y1="12.68"
              y2="55.34">
              <stop offset="0" stopColor="#ffffff" />
              <stop offset="1" stopColor="#8e8e8e" />
            </linearGradient>
            <linearGradient
              gradientUnits="userSpaceOnUse"
              id={`${id}-2`}
              x1="78.34"
              x2="101.46"
              y1="-26.66"
              y2="12.94">
              <stop offset="0" stopColor="#9a9a9a" />
              <stop offset="1" stopColor="#505050" />
            </linearGradient>
            <linearGradient
              gradientUnits="userSpaceOnUse"
              id={`${id}-3`}
              x1="88.52"
              x2="97.54"
              y1="9.59"
              y2="51.29">
              <stop offset="0" stopColor="#ffe2ac" />
              <stop offset="1" stopColor="#f49806" />
            </linearGradient>
          </defs>
          <path
            d="M42 61H48L52 57H56L62 51L48 47L42 61z"
            fill="#010101"
            fillOpacity="0.396"
          />
          <path
            d="M3 15L13 41L42 59L60 12L48 10L44 12L26 8L24 13L16 11L15.91 19.2L3 15z"
            fill="none"
            stroke="#000000"
            strokeWidth="4"
          />
          <path
            d="M26 8L14 41L42 58L60 12L48 10L44 12L26 8z"
            fill={`url(#${id}-0)`}
          />
          <path d="M16 11V41L42 57L49 22L16 11z" fill={`url(#${id}-1)`} />
          <path d="M16 11L49 22L42 57L52 20.37L16 11z" fill={`url(#${id}-2)`} />
          <path d="M3 15L13 41L42 59L38 30L3 15z" fill={`url(#${id}-3)`} />
          <path d="M3 15L38 30L42 59L40.5 28L3 15z" fill="#a03d03" />
        </>
      )}
      {themeId === "theme-mac-os-classic" && (
        <image
          height="64"
          href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAQAAAAEACAYAAABccqhmAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyVpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDYuMC1jMDAzIDc5LjE2NDUyNywgMjAyMC8xMC8xNS0xNzo0ODozMiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIDIyLjEgKE1hY2ludG9zaCkiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6RUQxOUUxODc0MjA4MTFFQkIwMUJBQkMxQ0Q2OTc4NzIiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6RUQxOUUxODg0MjA4MTFFQkIwMUJBQkMxQ0Q2OTc4NzIiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDpFRDE5RTE4NTQyMDgxMUVCQjAxQkFCQzFDRDY5Nzg3MiIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDpFRDE5RTE4NjQyMDgxMUVCQjAxQkFCQzFDRDY5Nzg3MiIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PmaYC0wAAANRSURBVHja7N3NUcMwEIBRlnFJpiW1kBrSglqgEA6oHc6KOQJDnLFjyz/v3T0wivhmc1gctdYXmCIiJl+e4d6FE2zv1RGAAAACAAgAIACAAAACAAgAIACAAAACAAgAIACAAAAb1zmCc4uID6dw4s/f/wM4fQDmXIAy3J83p+grACAAgAAAAgAIACAAgAAAAgAIACAAgAAAAgAIALCw0XXgiPhyTNy5H59OYbvGtjVH14FnrosCbQMQvgIAAgAIACAAgACAAAACAAgAIACAAAACAAgAIADAASz6duCUihNeQc795GdLsey5dX0fJgBAAAABAAQAEABAAAABAAQAEABAAAABAAQAEAAQAOC0OkfwU87Xyc+mdHGAD5qz4mqF2QQACAAgAIAAAAIACAAgAIAAAAIACAAgACAAgAAAAgCch3XgjfCGX0wAgAAAAgAIACAAgAAAAgAIACAAgAAAAgAIACAAgAAAf1kH/sUbftdhhdkEAAgAIACAAAACAAgAIACAAAACAAgAIACAAAACAAgAIACAAAACAAgAIACAAIAAAAIACAAgAIAAAAIACAAgAIAAAAIACAAgAIAAAAIACAAgAIAAAAIACAAgAIAAAAIACAAgAIAAAE/VOYL96/vY3e9cSvXBmQAAAQAEABAAQAAAAQAEABAAQAAAAQAEABAAQAAAAQBGWQfeiJRKk5+bcz/5WSu9JgBAAAABAAQAEABAAAABAAQAEABAAAABAAQAEABAAIClHXIdOOdrk5+b0sWNWkGrtyEfcf3ZBAC+AgACAAgAIACAAAACAAgAIACAAAACAAgAIACAAABbd8h14FZrua3WkFuxlmsCAAQAEABAAAABAAQAEABAAAABAAQAEABAAAABAAQAWFrnCJ5nj28Hzvl98rPWck0AgAAAAgAIACAAgAAAAgAIACAAgAAAAgAIACAAgAAAS4ta7690RoSdT9ip4e87TACAAAACAAgAIAAgAIAAAAIACAAgAIAAAAIACAAgAMCeja4Dw7+XZ8aq+NiaKiYAQAAAAQAEABAAQAAAAQAEABAAQAAAAQAEABAAQACAb9aBaXPxrBKbAAABAAQAEABAAAABAAQAEABAAAABAAQAEABAAAABAB5wE2AAhw5g6iVInp4AAAAASUVORK5CYII="
          width="64"
        />
      )}
    </svg>
  );
};

FileManagerIcon.displayName = "FileManagerIcon";
