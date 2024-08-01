import { ApplicationConfiguration } from "@/types";

import { PdfViewer } from "./PdfViewer";
import { PdfViewerIcon } from "./PdfViewerIcon";

export const APPLICATION_PDF_VIEWER: ApplicationConfiguration = {
  Component: PdfViewer,
  getWindow: (file) => ({
    height: 540,
    title: file?.title || "PDF Viewer",
    ...(file && "width" in file
      ? {
          width: file.width,
        }
      : {}),
  }),
  Icon: PdfViewerIcon,
  id: "application-pdf-viewer",
  title: "PDF Viewer",
};
