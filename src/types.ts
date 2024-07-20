export type Actions = {
  blurWindows(windowIds: ID[]): void;
  closeWindows(windowIds: ID[]): void;
  focusWindow(windowIds: ID[]): void;
  hideWindows(windowIds: ID[]): void;
  moveWindows(windowIds: ID[], payload: { left: number; top: number }): void;
  moveWindowTitleBar(windowIds: ID[], payload: { titleBarLeft: number }): void;
  resizeWindows(
    windowIds: ID[],
    payload: { height: number; width: number }
  ): void;
  showWindows(windowIds: ID[]): void;
  zoomWindows(windowIds: ID[]): void;
};

export type ID = string;

export const enum MimeType {
  ApplicationPdf = "application/pdf",
  TextMarkdown = "text/markdown",
}

export type State = {
  windows: Window[];
};

export type URL = string;

export type Window = {
  focused: boolean;
  height: number;
  hidden: boolean;
  id: ID;
  left: number;
  title: string;
  titleBarLeft: number;
  top: number;
  width: number;
  zoomed: boolean;
};
