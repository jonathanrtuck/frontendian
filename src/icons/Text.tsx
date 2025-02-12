"use client";

import { THEME_BEOS, THEME_MAC_OS_CLASSIC } from "@/themes";
import type { IconComponent } from "@/types";
import { useId } from "react";

export const Text: IconComponent = ({ themeId, ...props }) => {
  const id = useId();

  return (
    <svg
      {...props}
      version="1.1"
      viewBox="0 0 64 64"
      xmlns="http://www.w3.org/2000/svg">
      {themeId === THEME_BEOS.id && (
        <>
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
        </>
      )}
      {themeId === THEME_MAC_OS_CLASSIC.id && (
        <image
          height="64"
          href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAFPSURBVHgB7VfdrkQwEB6LWxckvP8DeQ0RCRK3S5yZbp1Mi7bp1l71S0SnpPPNPwAMWZbtePv6kueII8GCRJN3BGzbBr5I0xSSJFmlcjo/x+t99/6JISlflgV8URSFOBcNWZHIbiPxgofQdV22IuATlrck8TsCFIq2ba0krEnii6qqxL3ve2M4HiOQ54qxGSUmemVHhyiJH5zANE3w8boKVE4kTvvBCWAPuKwiWR3uBMiKsiz/5WEYoK5rJ5mv53kWCXlL+O4BKSdrDlCD4i40yXxNhpj6yi0BPZZY184yX4/jqCekAuc+oCdQ0zTC1Vwm0N6xFgpeZhXeIXDdeywErntBQqC79QB3O9/jcpAQXLmaw1QRQUJw5WoOU0XYQnD6ILEx9gV1QulRRedj49gVkUAkEAlEApFA8J/TO8if1pNOZRrSsDCN3W9B5+tT9Q8MZQUVHX5hTwAAAABJRU5ErkJggg=="
          width="64"
        />
      )}
    </svg>
  );
};

Text.displayName = "Text";
