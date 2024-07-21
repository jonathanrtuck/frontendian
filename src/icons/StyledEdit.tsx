import { forwardRef, SVGAttributes, useId } from "react";

export const StyledEdit = forwardRef<
  SVGSVGElement,
  SVGAttributes<SVGSVGElement>
>((props, ref) => {
  const id = useId();

  return (
    <svg
      ref={ref}
      version="1.1"
      viewBox="0 0 64 64"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <defs>
        <radialGradient
          cx="0"
          cy="0"
          gradientTransform="matrix(0.5714,0,0,0.3333,26,40)"
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
          y1="-12.09"
          y2="32.99">
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
        <linearGradient
          gradientUnits="userSpaceOnUse"
          id={`${id}-4`}
          x1="17.77"
          x2="46.22"
          y1="-64"
          y2="-64">
          <stop offset="0" stopColor="#c5b03a" />
          <stop offset="1" stopColor="#e9da71" />
        </linearGradient>
        <linearGradient
          gradientUnits="userSpaceOnUse"
          id={`${id}-5`}
          x1="43.05"
          x2="40.39"
          y1="9.82"
          y2="21.77">
          <stop offset="0" stopColor="#ffeed5" />
          <stop offset="0.553" stopColor="#dbab5f" />
          <stop offset="0.8143" stopColor="#ffeed5" />
        </linearGradient>
        <linearGradient
          gradientUnits="userSpaceOnUse"
          id={`${id}-6`}
          x1="10.58"
          x2="63.41"
          y1="-64"
          y2="-64">
          <stop offset="0" stopColor="#ffeaba" />
          <stop offset="1" stopColor="#fff6e3" />
        </linearGradient>
        <linearGradient
          gradientUnits="userSpaceOnUse"
          id={`${id}-7`}
          x1="19.74"
          x2="52.25"
          y1="-64"
          y2="-64">
          <stop offset="1" stopColor="#fbb50d" />
          <stop offset="0" stopColor="#f0ab06" />
        </linearGradient>
        <linearGradient
          gradientUnits="userSpaceOnUse"
          id={`${id}-7`}
          x1="129.35"
          x2="124.48"
          y1="27.64"
          y2="47.37">
          <stop offset="0" stopColor="#a52a04" />
          <stop offset="1" stopColor="#fdb44b" />
        </linearGradient>
        <linearGradient
          gradientUnits="userSpaceOnUse"
          id={`${id}-9`}
          x1="69.23"
          x2="69.23"
          y1="1.9"
          y2="14.09">
          <stop offset="0" stopColor="#ffeaee" />
          <stop offset="0.7765" stopColor="#d17c8a" />
          <stop offset="1" stopColor="#da9faa" />
        </linearGradient>
        <linearGradient
          gradientUnits="userSpaceOnUse"
          id={`${id}-10`}
          x1="114.68"
          x2="114.6"
          y1="3.18"
          y2="19.44">
          <stop offset="0" stopColor="#ffe3e8" />
          <stop offset="1" stopColor="#f8a1b1" />
        </linearGradient>
      </defs>
      <path
        d="M27 62L29 64L32.13 60.83L37 64L45.39 52.54L64 43L59 40L61 42L36 54L27 62z M58 39L62 36L58 34L55 37L58 39z"
        fill="#010101"
        fillOpacity="0.5725"
      />
      <path
        d="M6.25 35C6.25 35 11.87 41 16.87 47.5C21.87 54 26.25 60.75 26.25 60.75L59.12 41.87L32 20L6.25 35z"
        fill="none"
        stroke="#010101"
        strokeWidth="4"
      />
      <path
        d="M6.25 35C6.25 35 11.87 41 16.87 47.5C21.87 54 26.25 60.75 26.25 60.75L50.04 47.08L46 47L49 43L57.05 43.06L59.12 41.87L32 20L6.25 35z"
        fill={`url(#${id}-0)`}
      />
      <path
        d="M50.04 47.08L46 47L49 43L57.05 43.06L50.04 47.08z"
        fill="#e2c255"
      />
      <path
        d="M2.62 35.87C2.62 35.87 10.95 41.26 19 46.87C27.44 52.75 35.75 57.75 35.75 57.75L58.12 31.37C58.12 31.37 45.44 25.7 35.37 20.37C30.18 17.62 26 14.37 26 14.37L2.62 35.87z"
        fill="none"
        stroke="#010101"
        strokeWidth="4"
      />
      <path
        d="M2.62 35.87C2.62 35.87 10.95 41.26 19 46.87C27.44 52.75 35.75 57.75 35.75 57.75L44.86 47L33 45.25L23 43L25 42L37 40.75L49.74 41.25L58.12 31.37C58.12 31.37 45.44 25.7 35.37 20.37C30.18 17.62 26 14.37 26 14.37L2.62 35.87z"
        fill={`url(#${id}-1)`}
      />
      <path
        d="M20 41L34.87 25.87 M14 37L26.87 24"
        fill="none"
        stroke={`url(#${id}-2)`}
        strokeWidth="1"
      />
      <path
        d="M17 39L28.12 27.62"
        fill="none"
        stroke={`url(#${id}-3)`}
        strokeWidth="1"
      />
      <path
        d="M44.86 47L33 45.25L23 43L25 42L37 40.75L49.74 41.25L44.86 47z"
        fill={`url(#${id}-4)`}
      />
      <path
        d="M17 4H51C51 4 54 5 54 9C54 13 51 14 51 14H17L6 9L17 4z M17.96 4.58L16 7V11L17.96 13.41 M44.96 4.58C44.1 5.25 43 6.57 43 9C43 11.42 44.1 12.74 44.96 13.41"
        fill="none"
        stroke="#010101"
        strokeWidth="4"
        transform="matrix(0.7071,-0.7071,0.7071,0.7071,15.8224,37.5335)"
      />
      <path
        d="M17 4L14.37 6.76V11.23L17 14L8.69 9.84L8.74 8.12L17 4z"
        fill={`url(#${id}-5)`}
        transform="matrix(0.7071,-0.7071,0.7071,0.7071,15.8224,37.5335)"
      />
      <path
        d="M19 4L16.09 6.84L42 7L45 4H19z"
        fill={`url(#${id}-6)`}
        transform="matrix(0.7071,-0.7071,0.7071,0.7071,15.8224,37.5335)"
      />
      <path
        d="M16.09 6.84V11.15L42 11V7L16.09 6.84z"
        fill={`url(#${id}-7)`}
        transform="matrix(0.7071,-0.7071,0.7071,0.7071,15.8224,37.5335)"
      />
      <path
        d="M16.09 11.15L19 14H45L42 11L16.09 11.15z"
        fill={`url(#${id}-8)`}
        transform="matrix(0.7071,-0.7071,0.7071,0.7071,15.8224,37.5335)"
      />
      <path
        d="M51 4C51 4 48 5 48 9C48 13 51 14 51 14H47C47 14 44 13 44 9C44 5 47 4 47 4H51z"
        fill={`url(#${id}-9)`}
        transform="matrix(0.7071,-0.7071,0.7071,0.7071,15.8224,37.5335)"
      />
      <path
        d="M51 4C51 4 54 5 54 9C54 13 51 14 51 14C51 14 48 13 48 9C48 5 51 4 51 4z"
        fill={`url(#${id}-10)`}
        transform="matrix(0.7071,-0.7071,0.7071,0.7071,15.8224,37.5335)"
      />
    </svg>
  );
});

StyledEdit.displayName = "StyledEdit";
