import {
  APPLICATION_PDF_VIEWER,
  APPLICATION_TEXT_EDITOR,
} from "@/applications";
// import { Pdf, Text } from "@/icons";
import type { Application, IconComponent, MimeType } from "@/types";

export const MIMETYPES: Partial<
  Record<
    MimeType,
    {
      applicationId?: Application["id"];
      Icon: IconComponent | null;
    }
  >
> = {
  "application/pdf": {
    applicationId: APPLICATION_PDF_VIEWER.id,
    Icon: null,
  },
  "text/markdown": {
    applicationId: APPLICATION_TEXT_EDITOR.id,
    Icon: null,
  },
};
