"use client";

import type { IconComponent } from "@/types";
import { useId } from "react";

export const AlertError: IconComponent = ({ themeId, ...props }) => {
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
          gradientTransform="matrix(0.2281,0,0,0.2281,20.7999,47)"
          gradientUnits="userSpaceOnUse"
          id={`${id}-0`}
          r="64">
          <stop offset="0" stopColor="#ffffff" />
          <stop offset="0.25" stopColor="#ff3930" />
          <stop offset="1" stopColor="#bf0000" />
          <stop offset="0.8152" stopColor="#800000" />
        </radialGradient>
        <radialGradient
          cx="0"
          cy="0"
          gradientTransform="matrix(0.2281,0,0,0.2281,20.7999,47)"
          gradientUnits="userSpaceOnUse"
          id={`${id}-1`}
          r="64">
          <stop offset="0" stopColor="#ff756e" />
          <stop offset="0.3007" stopColor="#d50f05" />
          <stop offset="1" stopColor="#bf0000" />
          <stop offset="0.8152" stopColor="#800000" />
        </radialGradient>
        <linearGradient
          gradientUnits="userSpaceOnUse"
          id={`${id}-2`}
          x1="60.24"
          x2="76.04"
          y1="-28.46"
          y2="-10.2">
          <stop offset="0" stopColor="#ff6159" />
          <stop offset="1" stopColor="#e40000" />
        </linearGradient>
        <linearGradient
          gradientUnits="userSpaceOnUse"
          id={`${id}-3`}
          x1="50.37"
          x2="56.59"
          y1="-23.39"
          y2="-20.34">
          <stop offset="0" stopColor="#800000" />
          <stop offset="1" stopColor="#a00404" />
        </linearGradient>
        <linearGradient
          gradientUnits="userSpaceOnUse"
          id={`${id}-4`}
          x1="12"
          x2="36"
          y1="-20"
          y2="-20">
          <stop offset="0" stopColor="#ffc6c0" />
          <stop offset="1" stopColor="#ff7575" />
        </linearGradient>
      </defs>
      <path
        d="M55 64L63 56L55 52L40 54L36 58L40 62L55 64z M28 52C21.37 52 16 54.68 16 58C16 61.31 21.37 64 28 64C34.62 64 40 61.31 40 58C40 54.68 34.62 52 28 52z"
        fill="#010101"
        fillOpacity="0.4666"
      />
      <path
        d="M24 40C18.47 40 14 44.47 14 50C14 55.52 18.47 60 24 60C29.52 60 34 55.52 34 50C34 44.47 29.52 40 24 40z"
        fill="none"
        stroke="#000000"
        strokeWidth="4"
      />
      <path
        d="M24 40C18.47 40 14 44.47 14 50C14.01 55.52 18.47 60 24 60C29.52 60 34 55.52 34 50C32 52 26 49 22 47C22 47 22 44 24 40z"
        fill={`url(#${id}-0)`}
      />
      <path
        d="M24 40C22 44 22 47 22 47C26 49 32 52 34 50C34 44.47 29.52 40 24 40z"
        fill={`url(#${id}-1)`}
      />
      <path
        d="M21 2L10 8L21 43L29 35L38 6L21 2z"
        fill="none"
        stroke="#000000"
        strokeWidth="4"
      />
      <path d="M10 8L21 43L28 13L10 8z" fill={`url(#${id}-2)`} />
      <path d="M28 13L21 43L29 35L38 6L28 13z" fill={`url(#${id}-3)`} />
      <path d="M21 2L10 8L28 13L38 6L21 2z" fill={`url(#${id}-4)`} />
    </svg>
  );
};

AlertError.displayName = "AlertError";
