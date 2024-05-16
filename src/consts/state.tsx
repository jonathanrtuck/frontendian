import { PdfViewer, StyledEdit, Teapot, Tracker } from "applications";
import {
  Pdf as PdfIcon,
  Graphics as GraphicsIcon,
  StyledEdit as StyledEditIcon,
  Teapot as TeapotIcon,
  Text as TextIcon,
  Tracker as TrackerIcon,
} from "icons";
import { File, ID, State, Window } from "types";

export const APPLICATION_TRACKER_ID: ID = "application-tracker";

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
  type: "text/markdown",
  url: "https://raw.githubusercontent.com/jonathanrtuck/frontendian/main/README.md",
};

export const INITIAL_STATE: State = {
  applications: [
    {
      Component: PdfViewer,
      getWindow: (file) => ({
        height: 600,
        width: file && "width" in file ? file?.width : DEFAULT_WINDOW.width,
      }),
      id: "application-pdf-viewer",
      title: "PDF Viewer",
      windowIds: [],
    },
    {
      Component: StyledEdit,
      getWindow: (file) => ({
        title: file?.title ?? "Untitled",
      }),
      id: "application-styled-edit",
      title: "Styled Edit",
      windowIds: [],
    },
    {
      Component: Teapot,
      getWindow: () => ({
        height: 300,
        width: 300,
      }),
      id: "application-teapot",
      title: "Teapot",
      windowIds: [],
    },
    {
      Component: Tracker,
      id: APPLICATION_TRACKER_ID,
      title: "Tracker",
      windowIds: [],
    },
  ],
  desktop: ["file-resume", "application-teapot"],
  files: [
    FILE_ABOUT,
    {
      id: "file-resume",
      title: "Résumé",
      type: "application/pdf",
      url: `${process.env.PUBLIC_URL}/files/resume.pdf`,
      width: 800,
    },
  ],
  openApplicationIds: [APPLICATION_TRACKER_ID, "application-styled-edit"],
  stackingOrder: [DESKBAR_ID],
  types: {
    [APPLICATION_TRACKER_ID]: {
      icon: <TrackerIcon />,
    },
    "application-pdf-viewer": {
      icon: <GraphicsIcon />,
    },
    "application-styled-edit": {
      icon: <StyledEditIcon />,
    },
    "application-teapot": {
      icon: <TeapotIcon />,
    },

    "application/pdf": {
      application: "application-pdf-viewer",
      icon: <PdfIcon />,
    },
    "text/markdown": {
      application: "application-styled-edit",
      icon: <TextIcon />,
    },
  },
  windows: [],
};
