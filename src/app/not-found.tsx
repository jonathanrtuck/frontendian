import { Press_Start_2P } from "next/font/google";
import Link from "next/link";
import { type FunctionComponent } from "react";

const FONT_PRESS_START_2P = Press_Start_2P({
  subsets: ["latin"],
  weight: "400",
});

const NotFound: FunctionComponent = () => (
  <>
    <style>
      {`
@keyframes blink {
  0% {
    border-color: currentColor;
  }
  50% {
    border-color: transparent;
  }
}
a {
  align-items: center;
  color: rgb(255 0 0);
  display: flex;
  flex-direction: column;
  inset: 0;
  padding: 3rem;
  position: fixed;
  text-decoration: none;
}
body {
  background-color: rgb(0 0 0);
}
div {
  animation: blink 1s step-end infinite;
  border-color: currentColor;
  border-style: solid;
  border-width: 0.5rem 1rem;
  padding: 0.25rem 3rem;
  transform: scaleX(0.5);
}
p {
  line-height: 2;
  margin: 0;
  text-align: center;
  user-select: none;
}
      `}
    </style>
    <Link className={FONT_PRESS_START_2P.className} href="/" scroll={false}>
      <div>
        <p>
          Page not found. &nbsp; Press left mouse button to continue.
          <br />
          Guru Meditation &nbsp;#00000083.409AD600
        </p>
      </div>
    </Link>
  </>
);

export default NotFound;
