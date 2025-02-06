"use client";

import type { IconComponent } from "@/types";
import { useId } from "react";

export const AlertInfo: IconComponent = (props) => {
  const id = useId();

  return (
    <svg
      {...props}
      version="1.1"
      viewBox="0 0 64 64"
      xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient
          gradientUnits="userSpaceOnUse"
          id={`${id}-0`}
          x1="25.16"
          x2="56.75"
          y1="-43.14"
          y2="-34.42">
          <stop offset="0" stopColor="#227aff" />
          <stop offset="1" stopColor="#0025e5" />
        </linearGradient>
        <linearGradient
          gradientUnits="userSpaceOnUse"
          id={`${id}-1`}
          x1="46.77"
          x2="65.47"
          y1="-64.5"
          y2="-60.17">
          <stop offset="0" stopColor="#000081" />
          <stop offset="1" stopColor="#0909b7" />
        </linearGradient>
        <linearGradient
          gradientUnits="userSpaceOnUse"
          id={`${id}-2`}
          x1="46.77"
          x2="65.47"
          y1="-64.5"
          y2="-60.17">
          <stop offset="0" stopColor="#000081" />
          <stop offset="1" stopColor="#0909b7" />
        </linearGradient>
        <linearGradient
          gradientUnits="userSpaceOnUse"
          id={`${id}-3`}
          x1="17.32"
          x2="29.9"
          y1="37.58"
          y2="31.35">
          <stop offset="0" stopColor="#050ec5" />
          <stop offset="1" stopColor="#062fe3" />
        </linearGradient>
        <linearGradient
          gradientUnits="userSpaceOnUse"
          id={`${id}-4`}
          x1="-8.63"
          x2="12.76"
          y1="21.52"
          y2="10.9">
          <stop offset="0" stopColor="#67b5ff" />
          <stop offset="1" stopColor="#3b79f6" />
        </linearGradient>
        <linearGradient
          gradientUnits="userSpaceOnUse"
          id={`${id}-5`}
          x1="-8.63"
          x2="12.76"
          y1="21.52"
          y2="10.9">
          <stop offset="0" stopColor="#67b5ff" />
          <stop offset="1" stopColor="#3b79f6" />
        </linearGradient>
        <radialGradient
          cx="0"
          cy="0"
          gradientTransform="matrix(0.3125,0,0,0.1406,30,22)"
          gradientUnits="userSpaceOnUse"
          id={`${id}-6`}
          r="64">
          <stop offset="0" stopColor="#0530d1" />
          <stop offset="1" stopColor="#67b5ff" />
        </radialGradient>
        <radialGradient
          cx="0"
          cy="0"
          gradientTransform="matrix(0.2031,0,0,0.2031,19,9.43)"
          gradientUnits="userSpaceOnUse"
          id={`${id}-7`}
          r="64">
          <stop offset="0" stopColor="#3787ff" />
          <stop offset="0.3369" stopColor="#1b76ff" />
          <stop offset="1" stopColor="#031d8c" />
          <stop offset="0.8586" stopColor="#000081" />
        </radialGradient>
        <radialGradient
          cx="0"
          cy="0"
          gradientTransform="matrix(0.0527,0,0,-0.0527,19,9)"
          gradientUnits="userSpaceOnUse"
          id={`${id}-8`}
          r="64">
          <stop offset="0" stopColor="#ffffff" />
          <stop offset="1" stopColor="#3787ff" />
        </radialGradient>
      </defs>
      <path
        d="M36 42L32 64H36L46 54H49L56 47L46 42H36z M54 42C48.47 42 44 44.46 44 47.5C44 50.53 48.47 53 54 53C59.52 53 64 50.53 64 47.5C64 44.46 59.52 42 54 42z"
        fill="#000000"
        fillOpacity="0.3294"
      />
      <path
        d="M34 45V21L21 16L10 22V25L14 28V39L6 44V48L32 62L42 52V48L34 45z"
        fill="none"
        stroke="#000000"
        strokeWidth="4"
      />
      <path
        d="M24 53V28L10 22V25L14.03 28.26L14 48L6 44V48L32 62V57L24 53z"
        fill={`url(#${id}-0)`}
      />
      <path d="M32 57V62L42 52V48L32 57z" fill={`url(#${id}-1)`} />
      <path d="M24 53L34 45V21L24 28V53z" fill={`url(#${id}-2)`} />
      <path d="M42 48L34 45L24 53L36.4 53.03L42 48z" fill={`url(#${id}-3)`} />
      <path d="M24 53L32 57L36.4 53.03L24 53z" fill={`url(#${id}-4)`} />
      <path d="M6 44L14 48V39L6 44z" fill={`url(#${id}-5)`} />
      <path d="M21 16L10 22L24 28L34 21L21 16z" fill={`url(#${id}-6)`} />
      <path
        d="M22 2C16.47 2 11.99 6.47 12 12C12 17.52 16.47 22 22 22C27.52 22 32 17.52 32 12C32 6.47 27.52 2 22 2z"
        fill="none"
        stroke="#000000"
        strokeWidth="4"
      />
      <path
        d="M22 2C16.47 2 11.99 6.47 12 12C12 17.52 16.47 22 22 22C27.52 22 32 17.52 32 12C32 6.47 27.52 2 22 2z"
        fill={`url(#${id}-7)`}
      />
      <path
        d="M19 5.62C17.13 5.62 15.62 7.13 15.63 9C15.63 10.86 17.13 12.37 19 12.37C20.87 12.37 22.37 10.86 22.37 9C22.37 7.13 20.86 5.62 19 5.62z"
        fill={`url(#${id}-8)`}
      />
    </svg>
  );
};

AlertInfo.displayName = "AlertInfo";
