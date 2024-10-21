import * as applicationConfigurations from "@/applications";
import * as files from "@/files";
import * as fonts from "@/fonts";
import { Pdf, Text } from "@/icons";
import * as themes from "@/themes";
import { ID, MimeType, State, Window } from "@/types";

const {
  APPLICATION_FILE_MANAGER,
  APPLICATION_PDF_VIEWER,
  APPLICATION_TEXT_EDITOR,
} = applicationConfigurations;

export const DEFAULT_WINDOW_HEIGHT = 450;
export const DEFAULT_WINDOW_POSITION_INCREMENT = 32;
export const DEFAULT_WINDOW_POSITION_OFFSET = 96;
export const DEFAULT_WINDOW_WIDTH = 600;
export const DEFAULT_WINDOW: Window = {
  collapsed: false,
  focused: true,
  height: DEFAULT_WINDOW_HEIGHT,
  hidden: false,
  id: "",
  left: DEFAULT_WINDOW_POSITION_OFFSET,
  resizable: true,
  scrollable: true,
  title: "",
  titlebarLeft: 0,
  top: DEFAULT_WINDOW_POSITION_OFFSET,
  width: DEFAULT_WINDOW_WIDTH,
  zoomed: false,
};
export const DESKBAR_ID: ID = "deskbar";
export const INITIAL_STATE: State = {
  applications: Object.values(applicationConfigurations).map(
    (applicationConfiguration) => ({
      ...applicationConfiguration,
      windowIds: [],
    })
  ),
  desktop: [files.FILE_RESUME_PDF.id],
  files: Object.values(files),
  fonts: Object.values(fonts),
  openApplicationIds: [APPLICATION_FILE_MANAGER.id],
  stackingOrder: [DESKBAR_ID],
  theme: themes.THEME_MAC_OS_CLASSIC,
  types: {
    [MimeType.ApplicationPdf]: {
      application: APPLICATION_PDF_VIEWER.id,
      Icon: Pdf,
    },
    [MimeType.TextMarkdown]: {
      application: APPLICATION_TEXT_EDITOR.id,
      Icon: Text,
    },
  },
  windows: [],
};
export const IS_DEBUG_MODE = process.env.NODE_ENV === "development";
export const WINDOW_DIMENSION_BUFFER = 12;
export const UNTITLED_WINDOW_TITLE = "Untitled";
