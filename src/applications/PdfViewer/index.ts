import { BeOS, MacOSClassic } from "./icons";
import { PdfViewer } from "./PdfViewer";
import * as applications from "@/files";
import type { Application, Theme } from "@/types";

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
