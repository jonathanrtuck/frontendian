import { forwardRef, useId } from "react";

import { IconComponent } from "@/types";

export const TrackerIcon: IconComponent = forwardRef((props, ref) => {
  const id = useId();

  return (
    <svg
      {...props}
      ref={ref}
      version="1.1"
      viewBox="0 0 64 64"
      xmlns="http://www.w3.org/2000/svg">
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
    </svg>
  );
});

TrackerIcon.displayName = "TrackerIcon";
