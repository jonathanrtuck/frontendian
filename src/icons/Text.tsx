"use client";

import { useTheme } from "@/hooks";
import { type IconComponent } from "@/types";
import { useId } from "react";

export const Text: IconComponent = (props) => {
  const theme = useTheme();
  const id = useId();

  switch (theme) {
    case "beos":
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
              <stop offset="1" stopColor="#fffcc0" />
              <stop offset="0.4886" stopColor="#f1b706" />
            </radialGradient>
            <linearGradient
              gradientUnits="userSpaceOnUse"
              id={`${id}-1`}
              x1="107.04"
              x2="118.33"
              y1="-17.09"
              y2="27.99">
              <stop offset="0" stopColor="#ffefa5" />
              <stop offset="0.7424" stopColor="#fffcc0" />
              <stop offset="1" stopColor="#fff890" />
            </linearGradient>
            <linearGradient
              gradientUnits="userSpaceOnUse"
              id={`${id}-2`}
              x1="-47.14"
              x2="-28.46"
              y1="-15.78"
              y2="-37.85">
              <stop offset="0" stopColor="#010101" />
              <stop offset="1" stopColor="#9e9e9e" />
            </linearGradient>
            <linearGradient
              gradientUnits="userSpaceOnUse"
              id={`${id}-3`}
              x1="-47.14"
              x2="-28.46"
              y1="-15.78"
              y2="-37.85">
              <stop offset="0" stopColor="#010101" />
              <stop offset="1" stopColor="#9e9e9e" />
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
          <path
            d="M20 36L34.87 20.87 M14 32L26.87 19 M26 40L38.75 26.87 M32 44L42.75 32.37"
            fill="none"
            stroke={`url(#${id}-2)`}
            strokeWidth="1"
          />
          <path
            d="M29 42L44 26.37 M23 38L34.75 26.25 M17 34L28.12 22.62"
            fill="none"
            stroke={`url(#${id}-3)`}
            strokeWidth="1"
          />
        </svg>
      );
    case "mac-os-classic":
      return (
        <svg
          {...props}
          version="1.1"
          viewBox="0 0 64 64"
          xmlns="http://www.w3.org/2000/svg">
          <image
            height="64"
            href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAFSSURBVHgB7VdBroQgDK2KWxea6P3v4zk0MVETt4PyWzL+ACNIHJgVLzHQyqSvfRTGDHQICIAsy0AIkeHDcM5da5npwB/Bvu/wFEVR0MMFMUDgUOLwAl8CFHzbNniKqqrgOA6GgTnFvyORQyQMw8AwGSo/kXgRCfglAZKi7/tbEgwioWkaOY7j6JQjGoGy1JJleZ5z3BuShPYCAmNZFuD8s/NQEmbEjkOAMXbZRdQdl+vBAsqirut/e5omaNvWy1bn67rKDWklbHtBwSmbE3RAqSV02eqcEnGdK1YCppbY1962Op/n2dyQGrzPAXMDdV0nS63aBPKdcxkgd4d4LIGvL5oEvr4gEphlPaGWXfWpdhAJrkqtwtURQSS4KrUKV0fcSWCmJe4YPwWdhO+KajGjXce+SAQSgUQgEUgEPu6Cbz9ObaA/pu8b0v5dQAtc124M/AGZRAwMzyryCwAAAABJRU5ErkJggg=="
            width="64"
          />
        </svg>
      );
    case "windows-95":
      return (
        <svg
          {...props}
          version="1.1"
          viewBox="0 0 256 256"
          xmlns="http://www.w3.org/2000/svg">
          <image
            height="256"
            href="data:image/png;base64,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"
            width="216"
            x="20"
          />
        </svg>
      );
  }
};
