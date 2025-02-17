"use client";

import type { IconComponent } from "@/types";
import { useId } from "react";

export const File: IconComponent = (props) => {
  const id = useId();

  return (
    <svg
      {...props}
      version="1.1"
      viewBox="0 0 64 64"
      xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient
          cx="0"
          cy="0"
          gradientTransform="matrix(0.5714,0,0,0.3333,26,35)"
          gradientUnits="userSpaceOnUse"
          id={`${id}-0`}
          r="64">
          <stop offset="1" stopColor="#c0d5ff" />
          <stop offset="0.4886" stopColor="#896eff" />
        </radialGradient>
        <linearGradient
          gradientUnits="userSpaceOnUse"
          id={`${id}-1`}
          x1="105.45"
          x2="119.92"
          y1="-23.42"
          y2="34.32">
          <stop offset="0" stopColor="#a5b1ff" />
          <stop offset="0.7386" stopColor="#eaf1ff" />
          <stop offset="1" stopColor="#b3b8ff" />
        </linearGradient>
      </defs>
      <path
        d="M27 57L29 59L32.13 55.83L37 59L45.39 47.54L64 38L59 35L61 37L36 49L27 57z M58 34L62 31L58 29L55 32L58 34z"
        fill="#010101"
        fillOpacity="0.5725"
      />
      <path
        d="M6.25 30C6.25 30 11.87 36 16.87 42.5C21.87 49 26.25 55.75 26.25 55.75L59.12 36.87L32 15L6.25 30z"
        fill="none"
        stroke="#010101"
        strokeWidth="4"
      />
      <path
        d="M6.25 30C6.25 30 11.87 36 16.87 42.5C21.87 49 26.25 55.75 26.25 55.75L59.12 36.87L32 15L6.25 30z"
        fill={`url(#${id}-0)`}
      />
      <path
        d="M2.62 30.87C2.62 30.87 10.95 36.26 19 41.87C27.44 47.75 35.75 52.75 35.75 52.75L58.12 26.37C58.12 26.37 45.44 20.7 35.37 15.37C30.18 12.62 26 9.37 26 9.37L2.62 30.87z"
        fill="none"
        stroke="#010101"
        strokeWidth="4"
      />
      <path
        d="M2.62 30.87C2.62 30.87 10.95 36.26 19 41.87C27.44 47.75 35.75 52.75 35.75 52.75L58.12 26.37C58.12 26.37 45.44 20.7 35.37 15.37C30.18 12.62 26 9.37 26 9.37L2.62 30.87z"
        fill={`url(#${id}-1)`}
      />
    </svg>
  );
};

File.displayName = "File";
