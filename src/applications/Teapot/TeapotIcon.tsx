"use client";

import { useTheme } from "@/hooks";
import type { IconComponent } from "@/types";
import { useId } from "react";

export const TeapotIcon: IconComponent = (props) => {
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
            <linearGradient
              gradientUnits="userSpaceOnUse"
              id={`${id}-0`}
              x1="66.55"
              x2="62.35"
              y1="20.33"
              y2="28.08">
              <stop offset="0.0039" stopColor="#6d0202" />
              <stop offset="1" stopColor="#ba0505" />
            </linearGradient>
            <linearGradient
              gradientUnits="userSpaceOnUse"
              id={`${id}-1`}
              x1="66.55"
              x2="62.35"
              y1="20.33"
              y2="28.08">
              <stop offset="0.0078" stopColor="#ffb3b3" />
              <stop offset="1" stopColor="#dc0505" />
            </linearGradient>
            <linearGradient
              gradientUnits="userSpaceOnUse"
              id={`${id}-2`}
              x1="71.67"
              x2="65.84"
              y1="21.79"
              y2="32.38">
              <stop offset="0" stopColor="#ffb3b3" />
              <stop offset="0.4509" stopColor="#ff0606" />
              <stop offset="1" stopColor="#a70404" />
            </linearGradient>
            <radialGradient
              cx="0"
              cy="0"
              gradientTransform="matrix(0.5,0,0,0.5078,24,30.75)"
              gradientUnits="userSpaceOnUse"
              id={`${id}-3`}
              r="64">
              <stop offset="0" stopColor="#fbc5c5" />
              <stop offset="0.4274" stopColor="#e40606" />
              <stop offset="0.8862" stopColor="#ac0404" />
              <stop offset="1" stopColor="#bc0505" />
            </radialGradient>
            <radialGradient
              cx="0"
              cy="0"
              gradientTransform="matrix(-0.3914,0.0922,0.0773,0.3283,40.3562,13.404)"
              gradientUnits="userSpaceOnUse"
              id={`${id}-4`}
              r="64">
              <stop offset="0" stopColor="#ac0404" />
              <stop offset="1" stopColor="#ffc0c0" />
            </radialGradient>
            <radialGradient
              cx="0"
              cy="0"
              gradientTransform="matrix(0.375,0,0,0.375,24,28)"
              gradientUnits="userSpaceOnUse"
              id={`${id}-5`}
              r="64">
              <stop offset="0" stopColor="#3c0101" />
              <stop offset="1" stopColor="#bb0505" />
            </radialGradient>
            <radialGradient
              cx="0"
              cy="0"
              gradientTransform="matrix(0.2855,0.3314,-0.1809,0.1559,26.1921,38.2983)"
              gradientUnits="userSpaceOnUse"
              id={`${id}-6`}
              r="64">
              <stop offset="0" stopColor="#ff0606" />
              <stop offset="1" stopColor="#7b0303" />
            </radialGradient>
            <radialGradient
              cx="0"
              cy="0"
              gradientTransform="matrix(0.2906,0.0656,-0.028,0.124,13.7948,40.3303)"
              gradientUnits="userSpaceOnUse"
              id={`${id}-7`}
              r="64">
              <stop offset="0" stopColor="#ffc0c0" />
              <stop offset="0.4901" stopColor="#d80505" />
              <stop offset="1" stopColor="#ae0e0e" />
            </radialGradient>
            <linearGradient
              gradientUnits="userSpaceOnUse"
              id={`${id}-8`}
              x1="12.57"
              x2="8.78"
              y1="44.9"
              y2="47.94">
              <stop offset="0" stopColor="#ff9797" />
              <stop offset="0.4627" stopColor="#ff0606" />
              <stop offset="1" stopColor="#c60505" />
            </linearGradient>
          </defs>
          <path
            d="M38 34L12 49C12 51.93 13.46 54.67 16 56.99C13 58 8.91 60.03 10 61.61C13 66 21 63 25.58 62.17C29.27 63.33 33.5 64 38 64C52.35 64 64 57.27 64 49C64 46.79 63.16 44.69 61.68 42.81C60.74 41.61 66 39 63 37C60 35 55.41 37.8 53.83 37.09C49.44 35.14 43.95 34 38 34z"
            fill="#010000"
            fillOpacity="0.4156"
          />
          <path
            d="M48 25C48 25 53.16 19.41 56 18C58 17 60 19 60 19L57 17C57 17 52.52 15.1 50 16.37C48 17.37 43 22 43 22L48 25z M60 19C60 25 52 35 52 35L49 31C49 31 56 24 56 18C58 17 60 19 60 19z"
            fill="none"
            stroke="#010000"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="4"
            transform="matrix(1,0,0,1,-2,-2)"
          />
          <path
            d="M60 19C60 25 52 35 52 35L49 31C49 31 56 24 56 18C58 17 60 19 60 19z"
            fill={`url(#${id}-0)`}
            transform="matrix(1,0,0,1,-2,-2)"
          />
          <path
            d="M48 25C48 25 53.16 19.41 56 18C58 17 60 19 60 19L57 17C57 17 52.52 15.1 50 16.37C48 17.37 43 22 43 22L48 25z"
            fill={`url(#${id}-1)`}
            transform="matrix(1,0,0,1,-2,-2)"
          />
          <path
            d="M48 23C48 23 53 18 56 18C58.72 18 59 20 59 20C59 26 52 35 52 35"
            fill="none"
            stroke={`url(#${id}-2)`}
            strokeWidth="1"
            transform="matrix(1,0,0,1,-2,-2)"
          />
          <path
            d="M32 58C36 58 42 58 42 56C46 56 54 50 54 40C54 25 42 18 32 18C22 18 10 25 10 40C10 50 20 56 24 56C24 58 28 58 32 58z M18 52C26 53 22 38 18 37C14 36 11 38 6 38C4 38 2 40 2 43C6 49 12 52 18 52z"
            fill="none"
            stroke="#010000"
            strokeWidth="4"
          />
          <path
            d="M42 56C46 56 54 50 54 40C54 25 42 18 32 18C22 18 10 25 10 40H18C23 40 32 56 42 56z"
            fill={`url(#${id}-3)`}
          />
          <path
            d="M32 20.24C26 20.24 22 22.24 22 24.24C22 26.24 26 28.24 32 28.24C38 28.24 42 26.24 42 24.24C42 22.24 38 20.24 32 20.24z"
            fill="none"
            stroke={`url(#${id}-4)`}
            strokeWidth="4"
          />
          <path
            d="M32 20.24C26 20.24 22 22.24 22 24.24C22 26.24 26 28.24 32 28.24C38 28.24 42 26.24 42 24.24C42 22.24 38 20.24 32 20.24z"
            fill={`url(#${id}-5)`}
          />
          <path
            d="M10 40H18C23 40 32 56 42 56C42 58 36 58 32 58C28 58 24 58 24 56C20 56 10 48 10 40z"
            fill={`url(#${id}-6)`}
          />
          <path
            d="M18 52C26 53 22 38 18 37C14 36 11 38 6 38C4 38 2 40 2 43C6 49 12 52 18 52z"
            fill={`url(#${id}-7)`}
          />
          <path
            d="M3 43C3 40 4 39 7 39C7 42 6 43 3 43z"
            fill="none"
            stroke={`url(#${id}-8)`}
            strokeWidth="2"
          />
          <path d="M3 43C3 40 4 39 7 39C7 42 6 43 3 43z" fill="#010000" />
        </svg>
      );
    case "mac-os-classic":
      return (
        <svg
          {...props}
          version="1.1"
          viewBox="0 0 36 36"
          xmlns="http://www.w3.org/2000/svg">
          <ellipse cx="17.5" cy="31.5" fill="#660000" rx="8" ry="2" />
          <path
            d="M11.173 31.777s3.297.757 6.371.668c2.539-.074 5.614-.356 6.505-.757c0 0-1.069 1.381-6.416 1.381s-6.46-1.292-6.46-1.292z"
            fill="#cc0000"
          />
          <ellipse cx="17.5" cy="15.25" fill="#660000" rx="8.5" ry="2.25" />
          <path
            d="M33.582 16.654c3.518-.202 2.185 1.133 1.072 1.712c-.505.262-1.515 1.738-2.098 4.234c-.455 1.948-.847 5.658-5.213 5.391c-2.994-.183-.045-7.084-.045-7.084s1.871 3.119 3.876-1.47c.895-2.049 1.409-2.726 2.408-2.783zM5.829 28.351a4.823 4.823 0 0 1-3.021-1.04C.858 25.789.167 22.812.167 21c0-2.422 1.331-4.875 3.875-4.875c1.546 0 2.209.537 2.911 1.104c.394.319.801.648 1.48.988l-.782 1.931c-.849-.424-1.375-.85-1.798-1.192c-.607-.491-.884-.715-1.811-.715c-1.46 0-2.125 1.254-2.125 2.759c0 1.531.608 3.551 1.967 4.611c.822.643 1.815.822 2.945.54l.425 2.017a5.853 5.853 0 0 1-1.425.183z"
            fill="#cc0000"
          />
          <path
            d="M29 24.727C29 31.254 22.1 32 17.5 32S6 31.254 6 24.727S10.775 12 17.5 12S29 18.2 29 24.727z"
            fill="#cc0000"
          />
          <path
            d="M29.485 26.965c-.489.039-1.069-.757-1.069-.757c-.847 2.049-3.342 4.589-11.139 4.589c-6.995 0-9.579-2.139-10.96-3.965c0 0 .33 1.202-1.782.757c-.648-.137-1.926-.768-2.966-1.658c.34.524.749.998 1.239 1.38a4.825 4.825 0 0 0 3.021 1.04a5.79 5.79 0 0 0 1.087-.118c2.02 3.3 6.932 3.847 10.521 3.847c3.679 0 8.883-.566 10.798-4.097c3.525-.265 3.898-3.577 4.32-5.382c.439-1.88 1.12-3.18 1.645-3.82c-.03.013-.051.016-.082.031c-1.826.891-1.871 7.93-4.633 8.153zM4.891 17.698c-.64-.362-1.96-.223-2.629.891c-.442.736-.471 1.642-.34 2.316c.028-1.462.691-2.664 2.12-2.664c.926 0 1.204.224 1.811.715c.289.234.636.508 1.092.793l.174-.492s-1.203-.98-2.228-1.559zm19.663-3.704c.284.159.446.328.446.506c0 .828-3.358 1.5-7.5 1.5s-7.5-.672-7.5-1.5c0-.178.162-.347.446-.506C9.533 14.353 9 14.785 9 15.25c0 1.243 3.806 2.25 8.5 2.25s8.5-1.007 8.5-2.25c0-.465-.533-.897-1.446-1.256z"
            fill="#660000"
          />
          <ellipse cx="17.5" cy="11" fill="#660000" rx="2.8" ry="1.5" />
          <ellipse
            cx="34.364"
            cy="17.141"
            fill="#660000"
            rx="1.047"
            ry=".334"
          />
        </svg>
      );
  }
};

TeapotIcon.displayName = "TeapotIcon";
