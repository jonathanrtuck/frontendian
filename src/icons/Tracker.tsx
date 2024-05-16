import {
  forwardRef,
  FunctionComponent,
  RefAttributes,
  SVGAttributes,
  useId,
} from "react";

export const Tracker: FunctionComponent<
  RefAttributes<SVGSVGElement> &
    SVGAttributes<SVGSVGElement> & { handleAxis?: any }
> = forwardRef(({ handleAxis, ...props }, ref) => {
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
          x1="21.52"
          x2="53.86"
          y1="-12.88"
          y2="-5.66">
          <stop offset="0" stopColor="#875b2f" />
          <stop offset="1" stopColor="#c58a50" />
          <stop offset="0.7706" stopColor="#a97644" />
        </linearGradient>
        <radialGradient
          cx="0"
          cy="0"
          gradientTransform="matrix(0.7031,0,0,0.7499,19,13)"
          gradientUnits="userSpaceOnUse"
          id={`${id}-1`}
          r="64">
          <stop offset="0" stopColor="#dda771" />
          <stop offset="0.9962" stopColor="#a97644" />
        </radialGradient>
        <linearGradient
          gradientUnits="userSpaceOnUse"
          id={`${id}-2`}
          x1="42.37"
          x2="64.49"
          y1="-14.97"
          y2="-12.12">
          <stop offset="0" stopColor="#c28d59" />
          <stop offset="1" stopColor="#b6783b" />
          <stop offset="0.8646" stopColor="#a26c38" />
        </linearGradient>
        <linearGradient
          gradientUnits="userSpaceOnUse"
          id={`${id}-3`}
          x1="19.03"
          x2="40.05"
          y1="-15.59"
          y2="-20.72">
          <stop offset="0" stopColor="#f4c597" />
          <stop offset="1" stopColor="#daa470" />
        </linearGradient>
        <linearGradient
          gradientUnits="userSpaceOnUse"
          id={`${id}-4`}
          x1="42.37"
          x2="64.49"
          y1="-14.97"
          y2="-12.12">
          <stop offset="0" stopColor="#c28d59" />
          <stop offset="1" stopColor="#b6783b" />
          <stop offset="0.8646" stopColor="#a26c38" />
        </linearGradient>
        <radialGradient
          cx="0"
          cy="0"
          gradientTransform="matrix(0.2047,0.1393,-0.3093,0.4543,8.9428,7.1471)"
          gradientUnits="userSpaceOnUse"
          id={`${id}-5`}
          r="64">
          <stop offset="0" stopColor="#fdd6ab" />
          <stop offset="1" stopColor="#c48b54" />
        </radialGradient>
        <linearGradient
          gradientUnits="userSpaceOnUse"
          id={`${id}-6`}
          x1="32.03"
          x2="41.41"
          y1="-0.01"
          y2="9.37">
          <stop offset="0" stopColor="#d4975b" />
          <stop offset="1" stopColor="#a06f40" />
        </linearGradient>
        <linearGradient
          gradientUnits="userSpaceOnUse"
          id={`${id}-7`}
          x1="26.04"
          x2="47.09"
          y1="16.06"
          y2="36.56">
          <stop offset="0" stopColor="#ededed" />
          <stop offset="1" stopColor="#a5a5a5" />
        </linearGradient>
        <linearGradient
          gradientUnits="userSpaceOnUse"
          id={`${id}-8`}
          x1="49.12"
          x2="50.2"
          y1="26.44"
          y2="40.66">
          <stop offset="0" stopColor="#919191" />
          <stop offset="1" stopColor="#b5b5b5" />
        </linearGradient>
        <linearGradient
          gradientUnits="userSpaceOnUse"
          id={`${id}-9`}
          x1="71.62"
          x2="87.81"
          y1="-3.78"
          y2="31.31">
          <stop offset="0" stopColor="#ffffff" />
          <stop offset="1" stopColor="#e9e9e9" />
        </linearGradient>
        <linearGradient
          gradientUnits="userSpaceOnUse"
          id={`${id}-10`}
          x1="22.89"
          x2="24.62"
          y1="20.74"
          y2="33.09">
          <stop offset="0" stopColor="#ffea00" />
          <stop offset="1" stopColor="#ffb830" />
        </linearGradient>
      </defs>
      <path
        d="M19 58L29 57L34 64C34 64 43 65 50 62C57 59 65.26 51.95 64 45C62 34 50 40 50 40H38V44H44L35 52H24L19 58z"
        fill="#000000"
        fillOpacity="0.4078"
      />
      <path
        d="M20 16C16 22 16 26 16 30C16 34 18 36 18 36V50C18 50 10 56 20 56C28 56 24 38 24 38L32 42V54C32 54 20 62 34 62C42 62 36 34 36 34L40 30C40 30 44 34 46 34C48 34 50 34 50 34L52 40C52 40 44 46 56 46C64 46 54 30 54 30H52C52 30 52 24 52 20C52 16.81 50.72 11.81 46.16 8.08C58 16 58 2 58 2C58 2 52 10 42 6C36.12 3.65 24 10 20 16z"
        fill="none"
        stroke="#000000"
        strokeWidth="4"
        strokeLinejoin="round"
      />
      <path
        d="M32 17L16 29V31C16 31 19 31 21 33C23 35 24 38 24 38L32 42V54C32 54 20 62 34 62C42 62 36 34 36 34C36 34 38 28 38 26C38 24 36.33 19.7 32 17z"
        fill={`url(#${id}-0)`}
      />
      <path
        d="M40 30C40 30 43.15 30.94 46 30C49 29 50 22 50 20C50 14 46.16 8.08 46.16 8.08C46.16 8.08 41 6 37 7C29 9 21 19 21 19L32 17C36.33 19.7 38 24 38 26C38 28 36 34 36 34L40 30z"
        fill={`url(#${id}-1)`}
      />
      <path
        d="M18 36V50C18 50 10 56 20 56C28 56 24 38 24 38C24 38 23 35 21 33C19 31 16 31 16 31L18 36z"
        fill="#d7a26e"
      />
      <path
        d="M50 20C50 22 49 29 46 30C43.15 30.94 40 30 40 30C40 30 44 34 46 34C48 34 50 34 50 34L52 40C52 40 44 46 56 46C64 46 54 30 54 30H52C52 30 52 24 52 20C52 16.81 50.72 11.81 46.16 8.08C46.16 8.08 50 14 50 20z"
        fill={`url(#${id}-2)`}
      />
      <path
        d="M20 16L21 20C21 20 29 8.99 37 7C41 6 46.16 8.08 46.16 8.08L42 6C36.12 3.65 24 10 20 16z"
        fill={`url(#${id}-3)`}
      />
      <path d="M58 2C58 2 52 10 42 6L44 7C57 12 58 2 58 2z" fill="#daa470" />
      <path
        d="M46.16 8.08C58 16 58 2 58 2C58 2 57 12 44.02 7.01L46.16 8.08z"
        fill={`url(#${id}-4)`}
      />
      <path
        d="M16 6C16 6 13 4 8 6C2.74 8.1 2 14 2 14L12 12L16 6z"
        fill="none"
        stroke="#000000"
        strokeWidth="4"
        strokeLinejoin="round"
      />
      <path
        d="M16 6C16 6 13 4 8 6C2.74 8.1 2 14 2 14L12 12L16 6z"
        fill="#f8cca1"
      />
      <path
        d="M28.09 12.5C28.66 14.09 28.69 15.93 28 18C27.25 20.23 25.4 22.33 23.05 24.03C23.05 24.03 22 17 21 15L28.09 12.5z
           M20 6C23.93 7.3 27 9.47 28.09 12.5L21 15C22 17 23.05 24.03 23.05 24.03C19.76 26.41 15.5 28 12 28C6 28 4.46 24.13 6 18C8 10 11.51 3.17 20 6z"
        fill="none"
        stroke="#000000"
        strokeWidth="4"
        strokeLinejoin="round"
      />
      <path
        d="M20 6C23.93 7.3 27 9.47 28.09 12.5L21 15C22 17 23.05 24.03 23.05 24.03C19.76 26.41 15.5 28 12 28C6 28 4.46 24.13 6 18C8 10 11.51 3.17 20 6z"
        fill={`url(#${id}-5)`}
      />
      <path
        d="M28.09 12.5C28.66 14.09 28.69 15.93 28 18C27.25 20.23 25.4 22.33 23.05 24.03C23.05 24.03 22 17 21 15L28.09 12.5z"
        fill="#99632d"
      />
      <path
        d="M20 14C20 14 22 16 24 18C25.05 19.05 30 24 30 24C30 24 33 20 32 16C30.78 11.14 24 8 24 8C24 8 33.01 10.08 34 16C35 22 31 26 31 26C31 26 26 22 24 20C22 18 20 14 20 14z"
        fill="#000000"
      />
      <path
        d="M20 14L24 8C24 8 30.78 11.14 32 16C33 20 30 24 30 24C30 24 26 20 24 18C22 16 20 14 20 14z"
        fill={`url(#${id}-6)`}
      />
      <path d="M8.09 24.4L11 23V22L6 20V21L8.09 24.4z" fill="#000000" />
      <path
        d="M9 12C8.44 12 8 13.11 8 14.5C8 15.88 8.44 17 9 17C9.55 17 11 15.88 11 14.5C11 13.11 9.55 12 9 12z
           M16 16C14.89 16 14 16.89 14 18C14 19.1 14.89 20 16 20C17.1 20 18 19.1 18 18C18 16.89 17.1 16 16 16z"
        fill="#000000"
      />
      <path
        d="M2 44L24 55V37L12 32V28L2 24V44z"
        fill="none"
        stroke="#000000"
        strokeWidth="4"
      />
      <path d="M2 28V44L24 55V37L2 28z" fill={`url(#${id}-7)`} />
      <path d="M20 49L6 42L4 43L22 52V38L20 39V49z" fill="#ffffff" />
      <path d="M4 30V43L6 42V33L20 39L22 38L4 30z" fill={`url(#${id}-8)`} />
      <path d="M6 34V42L20 49V40L6 34z" fill={`url(#${id}-9)`} />
      <path d="M2 24V28L12 32V28L2 24z" fill={`url(#${id}-10)`} />
    </svg>
  );
});
