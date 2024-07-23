import { FunctionComponent } from "react";

import { Graphics as Icon } from "icons";
import { Application, ApplicationComponentProps } from "types";

const Component: FunctionComponent<ApplicationComponentProps> = () => null;

Component.displayName = "PdfViewer";

export const APPLICATION_PDF_VIEWER: Application = {
  Component,
  Icon,
  id: "application-pdf-viewer",
  title: "PDF Viewer",
  windowIds: [],
};
