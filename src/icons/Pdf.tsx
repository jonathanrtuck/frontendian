import { forwardRef, useId } from "react";

import { IconComponent } from "@/types";

export const Pdf: IconComponent = forwardRef(({ theme, ...props }, ref) => {
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
          gradientTransform="matrix(0.5714,0,0,0.3333,26,35)"
          gradientUnits="userSpaceOnUse"
          id={`${id}-0`}
          r="64">
          <stop offset="1" stopColor="#f4f4f4" />
          <stop offset="0.4886" stopColor="#ffc0c0" />
        </radialGradient>
        <linearGradient
          gradientUnits="userSpaceOnUse"
          id={`${id}-1`}
          x1="107.04"
          x2="118.33"
          y1="-17.09"
          y2="27.99">
          <stop offset="0" stopColor="#e7e7e7" />
          <stop offset="0.7424" stopColor="#ffffff" />
          <stop offset="1" stopColor="#ebebeb" />
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
        <linearGradient
          gradientUnits="userSpaceOnUse"
          id={`${id}-4`}
          x1="57.5"
          x2="71.09"
          y1="-34.42"
          y2="46.71">
          <stop offset="1" stopColor="#1467ff" />
          <stop offset="0.4212" stopColor="#06f8b7" />
        </linearGradient>
        <linearGradient
          gradientUnits="userSpaceOnUse"
          id={`${id}-5`}
          x1="38.95"
          x2="66"
          y1="-23.75"
          y2="-12.14">
          <stop offset="0" stopColor="#ff6d6d" />
          <stop offset="1" stopColor="#da1c1c" />
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
        d="M33 25L38 20 M24 19L29 14 M26 40L42 23 M34 46L47 31"
        fill="none"
        stroke={`url(#${id}-2)`}
        strokeWidth="1"
      />
      <path
        d="M30 43L46 25 M29 22L33 18"
        fill="none"
        stroke={`url(#${id}-3)`}
        strokeWidth="1"
      />
      <path
        d="M8 30L30 44L48 24L26 14L8 30z"
        fill={`url(#${id}-4)`}
        transform="matrix(0.4749,0,0,0.5,8.1999,15)"
      />
      <path
        d="M8 30L30 44L48 24L26 14L8 30z"
        fill="none"
        stroke="#010101"
        strokeWidth="1"
        transform="matrix(0.4749,0,0,0.5,8.1999,15)"
      />
      <path
        d="M30 16V2C30 2 36 4 41 4C45 4 53 2 58 2V16C53 16 45 18 41 18C36 18 30 16 30 16z"
        fill="none"
        stroke="#010101"
        strokeLinejoin="round"
        strokeWidth="4"
      />
      <path
        d="M30 16V2C30 2 36 4 41 4C45 4 53 2 58 2V16C53 16 45 18 41 18C36 18 30 16 30 16z"
        fill={`url(#${id}-5)`}
      />
      <path
        d="M50 14V7H54 M33 14V7C33 7 37 6 37 9C37 12 34 11 34 11 M41 7V14C41 14 46 15 46 12C46 12 46 10.3 46 9C46 6 41 7 41 7z M50 11H53"
        fill="none"
        stroke="#ffffff"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
    </svg>
  );
});

Pdf.displayName = "Pdf";
