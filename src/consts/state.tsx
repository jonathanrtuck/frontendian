import {
  Minesweeper,
  PdfViewer,
  StyledEdit,
  Teapot,
  Tracker,
} from "applications";
import {
  Graphics as GraphicsIcon,
  Minesweeper as MinesweeperIcon,
  Pdf as PdfIcon,
  StyledEdit as StyledEditIcon,
  Teapot as TeapotIcon,
  Text as TextIcon,
  Tracker as TrackerIcon,
} from "icons";
import { Application, File, MimeType, State, Window } from "types";

export const APPLICATION_MINESWEEPER: Application = {
  Component: Minesweeper,
  getWindow: () => ({
    height: 311,
    title: "Minesweeper",
    width: 244,
  }),
  id: "application-minesweeper",
  title: "Minesweeper",
  windowIds: [],
};

export const APPLICATION_PDF_VIEWER: Application = {
  Component: PdfViewer,
  getWindow: (file) => ({
    height: 600,
    title: file?.title || "PDF Viewer",
    width: file && "width" in file ? file?.width : DEFAULT_WINDOW.width,
  }),
  id: "application-pdf-viewer",
  title: "PDF Viewer",
  windowIds: [],
};

export const APPLICATION_STYLED_EDIT: Application = {
  Component: StyledEdit,
  id: "application-styled-edit",
  title: "Styled Edit",
  windowIds: [],
};

export const APPLICATION_TEAPOT: Application = {
  Component: Teapot,
  getWindow: () => ({
    height: 300,
    title: "Teapot",
    width: 300,
  }),
  id: "application-teapot",
  title: "Teapot",
  windowIds: [],
};

export const APPLICATION_TRACKER: Application = {
  Component: Tracker,
  id: "application-tracker",
  title: "Tracker",
  windowIds: [],
};

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
    [APPLICATION_MINESWEEPER.id]: {
      icon: <MinesweeperIcon />,
    },
    [APPLICATION_PDF_VIEWER.id]: {
      icon: <GraphicsIcon />,
    },
    [APPLICATION_STYLED_EDIT.id]: {
      icon: <StyledEditIcon />,
    },
    [APPLICATION_TEAPOT.id]: {
      icon: <TeapotIcon />,
    },
    [APPLICATION_TRACKER.id]: {
      icon: <TrackerIcon />,
    },
    [MimeType.ApplicationPdf]: {
      application: APPLICATION_PDF_VIEWER.id,
      icon: <PdfIcon />,
    },
    [MimeType.TextMarkdown]: {
      application: APPLICATION_STYLED_EDIT.id,
      icon: <TextIcon />,
    },
  },
  windows: [],
};

export const UNTITLED_WINDOW_TITLE = "Untitled";
