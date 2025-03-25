import type { Application } from "@/types";
import { AboutPdfViewer } from "./AboutPdfViewer";
import { PdfViewer } from "./PdfViewer";
import { ReactComponent as PDFViewerBeOS } from "./pdf-viewer-beos.svg";
import { ReactComponent as PDFViewerMacOSClassic } from "./pdf-viewer-mac-os-classic.svg";

export const APPLICATION_PDF_VIEWER: Application = {
  About: AboutPdfViewer,
  Component: PdfViewer,
  getWindow: (fileId) =>
    fileId
      ? {
          height: 550,
          width: "auto",
        }
      : {},
  Icon: (theme) => {
    switch (theme) {
      case "beos":
        return PDFViewerBeOS;
      case "mac-os-classic":
        return PDFViewerMacOSClassic;
    }
  },
  id: "application-pdf-viewer",
  mimetypes: ["application/pdf"],
  title: () => "PDF Viewer",
};
