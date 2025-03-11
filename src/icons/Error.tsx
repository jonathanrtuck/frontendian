"use client";

import { useTheme } from "@/hooks";
import { type IconComponent } from "@/types";
import { useId } from "react";

export const Error: IconComponent = (props) => {
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
    case "mac-os-classic":
      return (
        <svg
          {...props}
          version="1.1"
          viewBox="0 0 795 1040"
          xmlns="http://www.w3.org/2000/svg">
          <rect fill="#ffffff" height="990" width="695" x="50" y="46" />
          <g
            fill="#000000"
            stroke="#000000"
            transform="matrix(1,0,0,1,-1273.7166,-326.1282)">
            <path
              d="M1352.05,356.201L1976.24,356.201"
              strokeWidth="101.83"
              transform="matrix(0.30782,0,0,0.320563,1319.13,978.684)"
            />
            <path
              d="M1352.05,356.201L1976.24,356.201"
              strokeWidth="134.42"
              transform="matrix(0.102842,0,0,0.320563,1242.94,1010.61)"
            />
            <path
              d="M1352.05,356.201L1976.24,356.201"
              strokeWidth="34.4"
              transform="matrix(0.821429,0,0,1.02738,304.227,85.6187)"
            />
            <path
              d="M1352.05,356.201L1976.24,356.201"
              strokeWidth="39.3"
              transform="matrix(4.40335e-17,0.719122,-0.899424,5.50738e-17,1718.72,-504.225)"
            />
            <path
              d="M1352.05,356.201L1976.24,356.201"
              strokeWidth="39.3"
              transform="matrix(4.40335e-17,0.719122,-0.899424,5.50738e-17,2264.79,-504.225)"
            />
            <path
              d="M1352.05,356.201L1976.24,356.201"
              strokeWidth="34.4"
              transform="matrix(0.821429,0,0,1.02738,304.115,567.463)"
            />
            <path
              d="M1171.46,1080L1171.46,1225.04L925.317,1225.04L925.317,1080L1171.46,1080ZM1160.28,1115.95L936.501,1115.95C936.501,1115.95 936.501,1189.08 936.501,1189.08L1160.28,1189.08L1160.28,1115.95Z"
              transform="matrix(2.86132,0,0,0.889996,-1329.02,275.101)"
            />
            <path
              d="M1352.05,356.201L1976.24,356.201"
              strokeWidth="550.19"
              transform="matrix(0.051365,0,0,0.0642435,1249.05,364.041)"
            />
            <path
              d="M1352.05,356.201L1976.24,356.201"
              strokeWidth="550.19"
              transform="matrix(0.051365,0,0,0.0642435,1922.39,364.041)"
            />
            <path
              d="M1352.05,356.201L1976.24,356.201"
              strokeWidth="21.18"
              transform="matrix(8.17035e-17,1.33432,-1.66887,1.02189e-16,1897.01,-1400.64)"
            />
            <path
              d="M1352.05,356.201L1976.24,356.201"
              strokeWidth="21.18"
              transform="matrix(8.17035e-17,1.33432,-1.66887,1.02189e-16,2634.29,-1400.64)"
            />
            <path
              d="M1352.05,356.201L1976.24,356.201"
              strokeWidth="31.15"
              transform="matrix(1.02738,0,0,1.02738,-38.5065,-10.9824)"
            />
            <path
              d="M1352.05,356.201L1976.24,356.201"
              strokeWidth="275.09"
              transform="matrix(0.10273,0,0,0.128487,1468.18,694.123)"
            />
            <path
              d="M1352.05,356.201L1976.24,356.201"
              strokeWidth="550.19"
              transform="matrix(0.051365,0,0,0.0642435,1505.52,685.054)"
            />
            <path
              d="M1352.05,356.201L1976.24,356.201"
              strokeWidth="550.19"
              transform="matrix(0.051365,0,0,0.0642435,1601.64,685.054)"
            />
            <path
              d="M1352.05,356.201L1976.24,356.201"
              strokeWidth="275.09"
              transform="matrix(0.10273,0,0,0.128487,1596.25,789.981)"
            />
            <path
              d="M1352.05,356.201L1976.24,356.201"
              strokeWidth="550.19"
              transform="matrix(0.051365,0,0,0.0642435,1473.46,812.865)"
            />
            <path
              d="M1352.05,356.201L1976.24,356.201"
              strokeWidth="550.19"
              transform="matrix(0.051365,0,0,0.0642435,1729.83,845.561)"
            />
            <path
              d="M1352.05,356.201L1976.24,356.201"
              strokeWidth="110.26"
              transform="matrix(0.256301,0,0,0.320563,1228.48,689.868)"
            />
            <path
              d="M1352.05,356.201L1976.24,356.201"
              strokeWidth="550.19"
              transform="matrix(0.051365,0,0,0.0642435,1409.56,556.5)"
            />
            <path
              d="M1352.05,356.201L1976.24,356.201"
              strokeWidth="550.19"
              transform="matrix(0.051365,0,0,0.0642435,1473.46,556.5)"
            />
            <path
              d="M1352.05,356.201L1976.24,356.201"
              strokeWidth="550.19"
              transform="matrix(0.051365,0,0,0.0642435,1409.56,621.149)"
            />
            <path
              d="M1352.05,356.201L1976.24,356.201"
              strokeWidth="550.19"
              transform="matrix(0.051365,0,0,0.0642435,1441.62,589.196)"
            />
            <path
              d="M1352.05,356.201L1976.24,356.201"
              strokeWidth="550.19"
              transform="matrix(0.051365,0,0,0.0642435,1473.46,621.149)"
            />
            <path
              d="M1352.05,356.201L1976.24,356.201"
              strokeWidth="550.19"
              transform="matrix(0.051365,0,0,0.0642435,1665.92,556.872)"
            />
            <path
              d="M1352.05,356.201L1976.24,356.201"
              strokeWidth="550.19"
              transform="matrix(0.051365,0,0,0.0642435,1729.83,556.872)"
            />
            <path
              d="M1352.05,356.201L1976.24,356.201"
              strokeWidth="550.19"
              transform="matrix(0.051365,0,0,0.0642435,1665.92,621.52)"
            />
            <path
              d="M1352.05,356.201L1976.24,356.201"
              strokeWidth="550.19"
              transform="matrix(0.051365,0,0,0.0642435,1697.98,589.568)"
            />
            <path
              d="M1352.05,356.201L1976.24,356.201"
              strokeWidth="550.19"
              transform="matrix(0.051365,0,0,0.0642435,1729.83,621.52)"
            />
          </g>
        </svg>
      );
  }
};
