"use client";

import { IconComponent } from "@/types";
import { useId } from "react";

export const PdfViewerIcon: IconComponent = ({ theme, ...props }) => {
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
          x1="-64"
          x2="64"
          y1="-64"
          y2="-64">
          <stop offset="0.5812" stopColor="#a9a9a9" />
          <stop offset="1" stopColor="#181818" />
        </linearGradient>
        <linearGradient
          gradientUnits="userSpaceOnUse"
          id={`${id}-1`}
          x1="-64"
          x2="64"
          y1="-64"
          y2="-64">
          <stop offset="0.5532" stopColor="#ffffff" />
          <stop offset="1" stopColor="#979797" />
        </linearGradient>
        <linearGradient
          gradientUnits="userSpaceOnUse"
          id={`${id}-2`}
          x1="18.37"
          x2="42.89"
          y1="-30.82"
          y2="-22.94">
          <stop offset="0" stopColor="#919292" />
          <stop offset="1" stopColor="#d5d5d5" />
        </linearGradient>
        <linearGradient
          gradientUnits="userSpaceOnUse"
          id={`${id}-3`}
          x1="40"
          x2="52"
          y1="-23"
          y2="-23">
          <stop offset="0.3686" stopColor="#f8f8f8" />
          <stop offset="0.5176" stopColor="#c7c7c7" />
        </linearGradient>
        <linearGradient
          gradientUnits="userSpaceOnUse"
          id={`${id}-4`}
          x1="19.13"
          x2="31.86"
          y1="0.81"
          y2="9.56">
          <stop offset="0.0509" stopColor="#97bbff" />
          <stop offset="0.4823" stopColor="#4168db" stopOpacity="0.9137" />
          <stop offset="1" stopColor="#4168db" stopOpacity="0.5921" />
        </linearGradient>
        <linearGradient
          gradientUnits="userSpaceOnUse"
          id={`${id}-5`}
          x1="79.6"
          x2="95.97"
          y1="-48.49"
          y2="-37.23">
          <stop offset="0.0509" stopColor="#f56a7d" stopOpacity="0.6235" />
          <stop offset="0.8823" stopColor="#ea064c" stopOpacity="0.7803" />
        </linearGradient>
      </defs>
      <path
        d="M4 24V27L60 28V24H4z M32 8L4 28L32 48L60 28L32 8z"
        fill={`url(#${id}-0)`}
        transform="matrix(1.1184,0,-0,1.0438,-4.1046,5.8951)"
      />
      <path
        d="M32 4L4 24L32 44L60 24L32 4z"
        fill={`url(#${id}-1)`}
        transform="matrix(1.1184,0,0,1.0438,-4.1046,4.8513)"
      />
      <path
        d="M45 57C49 57 54 57 55 55C56 53 64 36 64 32C64 28 62 26 62 26L60 28C60 28 62 30 61.01 31.94C59.27 35.44 56 42 54 43C52 44 48 44 48 44L45 57z M15 29C25 29 30.99 21 32 20C34 18 33 16 33 16L35 15C35 15 36 18 34 22C33.25 23.47 21 42 15 40V29z"
        fill="#010101"
        fillOpacity="0.4196"
        transform="matrix(0.6888,0,0,0.6888,7.7273,5.5494)"
      />
      <path
        d="M2 16C2 16 26 2.87 30 6.87C34 10.87 34 14 34 14L33 15L28 9L18 13V18L2 28V16z"
        fill="none"
        stroke="#000000"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="4"
        transform="matrix(0.6888,0,0,0.6888,7.7273,5.5494)"
      />
      <path
        d="M2 16C2 16 26 2.87 30 6.87C34 10.87 34 14 34 14L33 15L28 9L18 13V18L2 28V16z"
        fill={`url(#${id}-2)`}
        transform="matrix(0.6888,0,0,0.6888,7.7273,5.5494)"
      />
      <path
        d="M46 36C46 36 54 22 58 20C62 18 62 29 62 29L61 31L58 26L53 34L52 46L45 55L26 46C26 46 25 38 22 36C19 34 18 42 18 42L2 34V17L46 36z"
        fill="none"
        stroke="#000000"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="4"
        transform="matrix(0.6888,0,0,0.6888,7.7273,5.5494)"
      />
      <path
        d="M46 36C46 36 54 22 58 20C62 18 62 29 62 29L61 31L58 26L53 34L52 46L45 55L26 46C26 46 25 38 22 36C19 34 18 42 18 42L2 34V17L46 36z M29 34C28 35 28 41 29 42L41 48C42 47 42 40 41 39L29 34z M6 23C5 24 5 30 6 31L16 36C17 35 17 29 16 28L6 23z"
        fill={`url(#${id}-3)`}
        transform="matrix(0.6888,0,0,0.6888,7.7273,5.5494)"
      />
      <path
        d="M6 23C5 24 5 30 6 31L16 36C17 35 17 29 16 28L6 23z M29 34C28 35 28 41 29 42L41 48C42 47 42 40 41 39L29 34z"
        fill="#000000"
        transform="matrix(0.6888,0,0,0.6888,7.7273,5.5494)"
      />
      <path
        d="M6 23C5 24 5 30 6 31L16 36C17 35 17 29 16 28L6 23z"
        fill={`url(#${id}-4)`}
        transform="matrix(0.6888,0,0,0.6888,7.7273,5.5494)"
      />
      <path
        d="M29 34C28 35 28 41 29 42L41 48C42 47 42 40 41 39L29 34z"
        fill={`url(#${id}-5)`}
        transform="matrix(0.6888,0,0,0.6888,7.7273,5.5494)"
      />
    </svg>
  );
};

PdfViewerIcon.displayName = "PdfViewerIcon";
