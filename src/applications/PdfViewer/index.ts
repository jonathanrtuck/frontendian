import { PdfViewer } from "./PdfViewer";
import { PdfViewerIcon } from "./PdfViewerIcon";
import type { Application } from "@/types";

export const APPLICATION_PDF_VIEWER: Application = {
  Component: PdfViewer,
  getWindow: (fileId) =>
    fileId
      ? {
          height: 550,
          width: 800,
        }
      : {},
  Icon: PdfViewerIcon,
  id: "application-pdf-viewer",
  mimetypes: ["application/pdf"],
  title: () => "PDF Viewer",
};
