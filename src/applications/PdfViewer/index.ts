import { BeOS, MacOSClassic } from "./icons";
import { PdfViewer } from "./PdfViewer";
import type { Application, Theme } from "@/types";

export const APPLICATION_PDF_VIEWER: Application = {
  Component: PdfViewer,
  getWindow: (fileId) =>
    fileId
      ? {
          height: 540,
          width: 800, // @todo
        }
      : {},
  Icon: (theme: Theme) => {
    switch (theme) {
      case "beos":
        return BeOS;
      case "mac-os-classic":
        return MacOSClassic;
    }
  },
  id: "application-pdf-viewer",
  mimetypes: ["application/pdf"],
  title: () => "PDF Viewer",
};
