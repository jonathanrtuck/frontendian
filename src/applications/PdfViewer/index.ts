import * as applications from "@/files";
import type { Application } from "@/types";
import { PdfViewer } from "./PdfViewer";
import { PdfViewerIcon } from "./PdfViewerIcon";

export const APPLICATION_PDF_VIEWER: Application = {
  Component: PdfViewer,
  getWindow: (fileId) => {
    const file = Object.values(applications).find(({ id }) => id === fileId);

    if (!file) {
      return {};
    }

    return {
      height: 540,
      title: file.title || "PDF Viewer",
      ...(file && "width" in file
        ? {
            width: file.width,
          }
        : {}),
    };
  },
  Icon: PdfViewerIcon,
  id: "application-pdf-viewer",
  mimetypes: ["application/pdf"],
  title: "PDF Viewer",
};
