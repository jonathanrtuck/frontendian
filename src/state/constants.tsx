import { State, Window } from "./types";
import {
  APPLICATION_MINESWEEPER,
  APPLICATION_PDF_VIEWER,
  APPLICATION_STYLED_EDIT,
  APPLICATION_TEAPOT,
  APPLICATION_TRACKER,
} from "applications";
import { FILE_ABOUT, FILE_RESUME } from "files";
import { Pdf, Text } from "icons";
import { MimeType } from "types";

export const DEFAULT_WINDOW: Omit<Window, "id" | "title" | "x" | "y"> = {
  focused: true,
  headerX: 0,
  height: 450,
  hidden: false,
  width: 600,
  zoomed: false,
};

export const DEFAULT_WINDOW_POSITION_INCREMENT = 32;

export const DEFAULT_WINDOW_POSITION_OFFSET = 96;

export const DESKBAR_ID = "deskbar";

export const INITIAL_STATE: State = {
  applications: [
    APPLICATION_MINESWEEPER,
    APPLICATION_PDF_VIEWER,
    APPLICATION_STYLED_EDIT,
    APPLICATION_TEAPOT,
    APPLICATION_TRACKER,
  ],
  desktop: [FILE_RESUME.id],
  files: [FILE_ABOUT, FILE_RESUME],
  openApplicationIds: [APPLICATION_TRACKER.id],
  stackingOrder: [DESKBAR_ID],
  types: {
    [MimeType.ApplicationPdf]: {
      application: APPLICATION_PDF_VIEWER.id,
      icon: <Pdf />,
    },
    [MimeType.TextMarkdown]: {
      application: APPLICATION_STYLED_EDIT.id,
      icon: <Text />,
    },
  },
  windows: [],
};

export const UNTITLED_WINDOW_TITLE = "Untitled";
