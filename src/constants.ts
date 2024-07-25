import * as applicationComponents from "@/applications";
import * as files from "@/files";
import * as fonts from "@/fonts";
import { Pdf, Text } from "@/icons";
import { ID, MimeType, State } from "@/types";

const { APPLICATION_PDF_VIEWER, APPLICATION_STYLED_EDIT, APPLICATION_TRACKER } =
  applicationComponents;

export const DEFAULT_WINDOW_HEIGHT = 450;
export const DEFAULT_WINDOW_POSITION_INCREMENT = 32;
export const DEFAULT_WINDOW_POSITION_OFFSET = 96;
export const DEFAULT_WINDOW_WIDTH = 600;
export const DESKBAR_ID: ID = "deskbar";
export const INITIAL_STATE: State = {
  applications: Object.values(applicationComponents).map(
    (applicationComponent) => ({
      ...applicationComponent,
      windowIds: [],
    })
  ),
  desktop: [files.FILE_RESUME_PDF.id],
  files: Object.values(files),
  fonts: Object.values(fonts),
  openApplicationIds: [APPLICATION_TRACKER.id],
  stackingOrder: [DESKBAR_ID],
  types: {
    [MimeType.ApplicationPdf]: {
      application: APPLICATION_PDF_VIEWER.id,
      Icon: Pdf,
    },
    [MimeType.TextMarkdown]: {
      application: APPLICATION_STYLED_EDIT.id,
      Icon: Text,
    },
  },
  windows: [],
};
