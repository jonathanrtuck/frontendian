"use client";

import type { IconComponent } from "@/types";
import { useId } from "react";

export const WindowVisible: IconComponent = ({ themeId, ...props }) => {
  const id = useId();

  return (
    <svg
      {...props}
      version="1.1"
      viewBox="-4 -4 64 64"
      xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient
          gradientUnits="userSpaceOnUse"
          id={`${id}-0`}
          x1="128"
          x2="128"
          y1="-4"
          y2="12">
          <stop offset="0.6062" stopColor="#ffff65" />
          <stop offset="1" stopColor="#ffaf12" />
        </linearGradient>
      </defs>
      <path d="M0 0V12H32V0H0z" fill={`url(#${id}-0)`} />
      <path d="M0 12V56H52V12H0z" fill="#c8c8c8" />
      <path
        d="M0 12V56H52V12H0z"
        fill="#ffffff"
        transform="matrix(0.6923,0,0,0.7272,8,7.2727)"
      />
      <path d="M4 52V4H32V12H52V8H36V0H0V52H4z" fill="#787878" />
      <path d="M0 56H52V12H48V52H0V56z" fill="#000000" />
      <path d="M32 4V8H36V4H32z" fill="#000000" />
    </svg>
  );
};

WindowVisible.displayName = "WindowVisible";
