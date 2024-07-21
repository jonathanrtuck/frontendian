import { forwardRef, SVGAttributes, useId } from "react";

export const Teapot = forwardRef<SVGSVGElement, SVGAttributes<SVGSVGElement>>(
  (props, ref) => {
    const id = useId();

    return (
      <svg
        ref={ref}
        version="1.1"
        viewBox="0 0 64 64"
        xmlns="http://www.w3.org/2000/svg"
        {...props}>
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
  }
);

Teapot.displayName = "Teapot";
