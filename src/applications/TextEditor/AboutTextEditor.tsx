"use client";

import { Content } from "@/components";
import type { FunctionComponent } from "react";

export const AboutTextEditor: FunctionComponent = () => (
  <Content>
    <p>
      Edit and preview{" "}
      <a href="https://en.wikipedia.org/wiki/Markdown">markdown</a>.
    </p>
    <p>
      <b>View</b> can be toggled in the menu.
    </p>
  </Content>
);

AboutTextEditor.displayName = "AboutTextEditor";
