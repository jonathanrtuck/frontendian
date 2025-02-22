"use client";

import { Content } from "@/components";
import type { FunctionComponent } from "react";

export const AboutPdfViewer: FunctionComponent = () => (
  <Content>
    <p>
      Renders <a href="https://en.wikipedia.org/wiki/PDF">PDFs</a>.
    </p>
    <p>
      Documents can be printed from the <b>File</b> menu.
    </p>
  </Content>
);

AboutPdfViewer.displayName = "AboutPdfViewer";
