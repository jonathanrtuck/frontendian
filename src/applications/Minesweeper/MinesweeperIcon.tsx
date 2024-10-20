import { forwardRef, useId } from "react";

import { IconComponent } from "@/types";

export const MinesweeperIcon: IconComponent = forwardRef(
  ({ theme, ...props }, ref) => {
    const id = useId();

    return (
      <svg
        {...props}
        ref={ref}
        version="1.1"
        viewBox="0 0 64 64"
        xmlns="http://www.w3.org/2000/svg">
        <defs>
          <radialGradient
            cx="0"
            cy="0"
            gradientTransform="matrix(0.625,0,0,0.625,18,18)"
            gradientUnits="userSpaceOnUse"
            id={`${id}-0`}
            r="64">
            <stop offset="0" stopColor="#808080" />
            <stop offset="0.7089" stopColor="#010101" />
            <stop offset="1" stopColor="#3d3d3d" />
          </radialGradient>
          <radialGradient
            cx="0"
            cy="0"
            gradientTransform="matrix(0.1875,0,0,0.1875,18,22)"
            gradientUnits="userSpaceOnUse"
            id={`${id}-1`}
            r="64">
            <stop offset="0" stopColor="#ffffff" />
            <stop offset="1" stopColor="#ffffff" stopOpacity="0" />
          </radialGradient>
          <radialGradient
            cx="0"
            cy="0"
            gradientTransform="matrix(0.4677,-0.0299,0.0122,0.191,9.2933,12.004)"
            gradientUnits="userSpaceOnUse"
            id={`${id}-2`}
            r="64">
            <stop offset="0.0026" stopColor="#868686" />
            <stop offset="1" stopColor="#010101" />
          </radialGradient>
          <radialGradient
            cx="0"
            cy="0"
            gradientTransform="matrix(0.5185,0.2891,-0.1521,0.2729,18.506,7.1479)"
            gradientUnits="userSpaceOnUse"
            id={`${id}-3`}
            r="64">
            <stop offset="0" stopColor="#010101" />
            <stop offset="0.9894" stopColor="#ffffff" />
          </radialGradient>
          <linearGradient
            gradientUnits="userSpaceOnUse"
            id={`${id}-4`}
            x1="43.53"
            x2="57.04"
            y1="20.47"
            y2="24.14">
            <stop offset="0" stopColor="#ffde05" />
            <stop offset="1" stopColor="#ff0606" stopOpacity="0.1843" />
          </linearGradient>
          <radialGradient
            cx="0"
            cy="0"
            gradientTransform="matrix(0.1524,0.0135,-0.0215,0.242,21.4263,15.6274)"
            gradientUnits="userSpaceOnUse"
            id={`${id}-5`}
            r="64">
            <stop offset="0" stopColor="#ffda59" />
            <stop offset="0.4947" stopColor="#5a4602" />
            <stop offset="1" stopColor="#ffda59" />
          </radialGradient>
          <linearGradient
            gradientUnits="userSpaceOnUse"
            id={`${id}-6`}
            x1="43.53"
            x2="57.04"
            y1="20.47"
            y2="24.14">
            <stop offset="0" stopColor="#fffc04" />
            <stop offset="1" stopColor="#d70505" />
          </linearGradient>
        </defs>
        <path
          d="M32 60C48 60 59 60 63 54C66.5 48.73 58 44 50 42"
          fill="#010101"
          fillOpacity="0.5058"
          transform="matrix(1,0,0,1,0,4)"
        />
        <path
          d="M30 2C45.68 2 58 14.31 58 30C58 45.68 45.68 58 30 58C14.31 58 2 45.68 2 30C2 14.31 14.31 2 30 2z"
          fill="none"
          stroke="#010101"
          strokeWidth="4"
          transform="matrix(1,0,0,1,0,4)"
        />
        <path
          d="M30 2C45.68 2 58 14.31 58 30C58 45.68 45.68 58 30 58C14.31 58 2 45.68 2 30C2 14.31 14.31 2 30 2z"
          fill={`url(#${id}-0)`}
          transform="matrix(1,0,0,1,0,4)"
        />
        <path
          d="M18 10C24.71 10 30 15.28 30 22C30 28.71 24.71 34 18 34C11.27 34 6 28.71 6 22C6 15.28 11.27 10 18 10z"
          fill={`url(#${id}-1)`}
          transform="matrix(1,0,0,1,0,4)"
        />
        <path
          d="M16 4C8.26 4 2 6.9 2 10.5V16.5C2 20.09 8.26 23 16 23C23.73 23 30 20.09 30 16.5V10.5C30 6.9 23.73 4 16 4z"
          fill="#010101"
          transform="matrix(0.883,0.4692,-0.4692,0.883,35.9085,-1.7507)"
        />
        <path
          d="M16 17C8.26 17 2 14 2 10.5V16.5C2 20.09 8.26 23 16 23C23.73 23 30 20.09 30 16.5V10.5C30 14 23.73 17 16 17z"
          fill={`url(#${id}-2)`}
          transform="matrix(0.883,0.4692,-0.4692,0.883,35.9085,-1.7507)"
        />
        <path
          d="M16 4C23.84 4 30 6.85 30 10.5C30 14.13 23.84 17 16 17C8.15 17 2 14.13 2 10.5C2 6.85 8.15 4 16 4z"
          fill={`url(#${id}-3)`}
          transform="matrix(0.883,0.4692,-0.4692,0.883,35.9085,-1.7507)"
        />
        <path
          d="M47 32L48 38L50 32L58 36L52 30L56 28H52L54 20L49 27L44 24L46 28H40L46 30L40 34L47 32z"
          fill={`url(#${id}-4)`}
          transform="matrix(0.1722,1.3781,-1.3781,0.1722,80.0255,-40.0258)"
        />
        <path
          d="M16 10C16 8 16 4 20 4C24 4 24 10 24 14C24 14 24 22 28 24"
          fill="none"
          stroke="#010101"
          strokeLinecap="round"
          strokeWidth="8"
          transform="matrix(0.883,0.4692,-0.4692,0.883,36.9085,-2.7507)"
        />
        <path
          d="M16 10C16 8 16 4 20 4C24 4 24 10 24 14C24 14 24 22 28 24"
          fill="none"
          stroke={`url(#${id}-5)`}
          strokeLinecap="round"
          strokeWidth="4"
          transform="matrix(0.883,0.4692,-0.4692,0.883,36.9085,-2.7507)"
        />
        <path
          d="M47 32L48 38L50 32L58 36L52 30L56 28H52L54 20L49 27L44 24L46 28H40L46 30L40 34L47 32z"
          fill={`url(#${id}-6)`}
          transform="matrix(1,0,0,1,0,4)"
        />
      </svg>
    );
  }
);

MinesweeperIcon.displayName = "MinesweeperIcon";
