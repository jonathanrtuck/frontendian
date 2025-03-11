"use client";

import { useTheme } from "@/hooks";
import { type IconComponent } from "@/types";
import { useId } from "react";

export const Network: IconComponent = (props) => {
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
              x1="55.69"
              x2="74.97"
              y1="-10.23"
              y2="-5.41">
              <stop offset="0" stopColor="#5c5c5c" />
              <stop offset="1" stopColor="#838383" />
            </linearGradient>
            <radialGradient
              cx="0"
              cy="0"
              gradientTransform="matrix(0.25,0,0,0.25,10,10)"
              gradientUnits="userSpaceOnUse"
              id={`${id}-1`}
              r="64">
              <stop offset="0" stopColor="#29b6ff" />
              <stop offset="1" stopColor="#035492" />
            </radialGradient>
            <radialGradient
              cx="0"
              cy="0"
              gradientTransform="matrix(0.25,0,0,0.25,10,10)"
              gradientUnits="userSpaceOnUse"
              id={`${id}-2`}
              r="64">
              <stop offset="0" stopColor="#9ff699" />
              <stop offset="1" stopColor="#049a43" />
            </radialGradient>
            <linearGradient
              gradientUnits="userSpaceOnUse"
              id={`${id}-3`}
              x1="17.05"
              x2="30.46"
              y1="31.34"
              y2="40.08">
              <stop offset="0" stopColor="#56ff22" />
              <stop offset="1" stopColor="#05d005" />
            </linearGradient>
          </defs>
          <path
            d="M44 64H49L64 48L60 46L44 64z M19 20C11.82 20 6 22.23 6 25C6 27.76 11.82 30 19 30C26.17 30 32 27.76 32 25C32 22.23 26.17 20 19 20z"
            fill="#010101"
            fillOpacity="0.4313"
          />
          <path
            d="M32 42C32 42 18 42 18 38C18 30 34 28 34 22C34 18 26 18 26 18 M49 26L58 29V48L44 62L34 56V36L49 26z M14 2C7.37 2 2 7.37 2 14C2 20.62 7.37 26 14 26C20.62 26 26 20.62 26 14C26 7.37 20.62 2 14 2z"
            fill="none"
            stroke="#000000"
            strokeWidth="4"
          />
          <path d="M44 40V62L34 56V36L44 40z" fill="#b8b8b8" />
          <path d="M49 26L58 29L44 40L34 36L49 26z" fill="#e7e7e7" />
          <path d="M44 40L58 29V48L44 62V40z" fill={`url(#${id}-0)`} />
          <path
            d="M14 2C10.46 2 7.27 3.53 5.08 5.96C5.08 5.96 8 6 8 8C8 10 4 14 4 14V16C4 16 6 16 8 18C10 20 8 22 8 22L10.27 25.41C11.45 25.79 12.7 26 14 26C16.99 26 19.73 24.9 21.83 23.08L20 22L22 18C22 18 16 16 16 14C16 12 20 8 20 8L18 6L15.87 8H14L16 6L14 4L17.39 2.48C16.31 2.17 15.17 2 14 2z"
            fill={`url(#${id}-1)`}
          />
          <path
            d="M5.08 5.96C3.16 8.09 2 10.91 2 14C2 19.32 5.47 23.84 10.27 25.41L8 22C8 22 10 20 8 18C6 16 4 16 4 16V14C4 14 8 10 8 8C8 6 5.08 5.96 5.08 5.96z M14 8H16.37L18 6L20 8C20 8 16 12 16 14C16 16 22 18 22 18L20 22L21.83 23.08C24.38 20.88 26 17.63 26 14C26 8.55 22.36 3.95 17.39 2.48L14 4L16 6L14 8z"
            fill={`url(#${id}-2)`}
          />
          <path
            d="M10 48C6.68 48 3.99 50.68 3.99 54C3.99 57.31 6.68 60 10 60C13.31 60 16 57.31 16 54C16 50.68 13.31 48 10 48z"
            fill="none"
            stroke="#000000"
            strokeWidth="8"
          />
          <path
            d="M10 48C6.68 48 3.99 50.68 3.99 54C3.99 57.31 6.68 60 10 60C13.31 60 16 57.31 16 54C16 50.68 13.31 48 10 48z"
            fill={`url(#${id}-3)`}
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
            href="data:image/png;base64,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"
            width="64"
          />
        </svg>
      );
  }
};
