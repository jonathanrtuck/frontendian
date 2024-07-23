import * as applications from "applications";
import * as files from "files";
import { Pdf, Text } from "icons";
import { ID, MimeType, State } from "types";

export const DEFAULT_WINDOW_HEIGHT = 450;

export const DEFAULT_WINDOW_POSITION_INCREMENT = 32;

export const DEFAULT_WINDOW_POSITION_OFFSET = 96;

export const DEFAULT_WINDOW_WIDTH = 600;

export const DESKBAR_ID: ID = "deskbar";

export const INITIAL_STATE: State = {
  applications: Object.values(applications),
  desktop: [],
  files: Object.values(files),
  openApplicationIds: [applications.APPLICATION_TRACKER.id],
  stackingOrder: [DESKBAR_ID, "window-id-0"],
  types: {
    [MimeType.ApplicationPdf]: {
      application: applications.APPLICATION_PDF_VIEWER.id,
      icon: <Pdf />,
    },
    [MimeType.TextMarkdown]: {
      application: applications.APPLICATION_STYLED_EDIT.id,
      icon: <Text />,
    },
  },
  windows: [
    {
      focused: true,
      height: 300,
      hidden: false,
      id: "window-id-0",
      left: 96,
      title: "Window…",
      titleBarLeft: 0,
      top: 96,
      width: 480,
      zoomed: false,
    },
  ],
};
