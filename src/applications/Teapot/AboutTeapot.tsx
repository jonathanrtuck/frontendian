"use client";

import type { FunctionComponent } from "react";

export const AboutTeapot: FunctionComponent = () => (
  <p>
    WebGL rendering of the{" "}
    <a href="https://en.wikipedia.org/wiki/Utah_teapot">Utah Teapot</a>.
  </p>
);

AboutTeapot.displayName = "AboutTeapot";
