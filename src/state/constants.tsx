import { File, MimeType, State, Window } from "./types";
import {
  APPLICATION_MINESWEEPER,
  APPLICATION_PDF_VIEWER,
  APPLICATION_STYLED_EDIT,
  APPLICATION_TEAPOT,
  APPLICATION_TRACKER,
} from "applications";
import { Pdf, Text } from "icons";

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

export const EMPTY_STATE: State = {
  applications: [],
  desktop: [],
  files: [],
  openApplicationIds: [],
  stackingOrder: [],
  types: {},
  windows: [],
};

export const FILE_ABOUT: File = {
  id: "file-about",
  title: "About frontendian",
  type: MimeType.TextMarkdown,
  url: "https://raw.githubusercontent.com/jonathanrtuck/frontendian/main/README.md",
};

export const FILE_RESUME: File = {
  height: 990 * 2, // numPages
  id: "file-resume",
  title: "Résumé",
  type: MimeType.ApplicationPdf,
  url: `${process.env.PUBLIC_URL}/files/resume.pdf`,
  width: 765, // 11/8.5 ratio
};

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
