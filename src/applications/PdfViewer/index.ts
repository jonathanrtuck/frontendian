import type { Application } from "@/types";
import { PdfViewer } from "./PdfViewer";
import { PdfViewerIcon } from "./PdfViewerIcon";

export const APPLICATION_PDF_VIEWER: Application = {
  Component: PdfViewer,
  getTitle: () => "PDF Viewer",
  getWindow: ({ file, themeId }) => ({
    height: 540,
    title: file?.getTitle({ themeId }) || "PDF Viewer",
    ...(file && "width" in file
      ? {
          width: file.width,
        }
      : {}),
  }),
  Icon: PdfViewerIcon,
  id: "application-pdf-viewer",
};
