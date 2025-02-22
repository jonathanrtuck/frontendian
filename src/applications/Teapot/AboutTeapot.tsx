"use client";

import { Content } from "@/components";
import type { FunctionComponent } from "react";

export const AboutTeapot: FunctionComponent = () => (
  <Content>
    <p>
      WebGL rendering of the{" "}
      <a href="https://en.wikipedia.org/wiki/Utah_teapot">Utah Teapot</a>.
    </p>
  </Content>
);

AboutTeapot.displayName = "AboutTeapot";
