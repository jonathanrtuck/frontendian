export type Actions = {
  blur(payload: { id: ID } | { ids: ID[] }): void;
  close(payload: { id: ID } | { ids: ID[] }): void;
  focus(payload: { id: ID } | { ids: ID[] }): void;
  hide(payload: { id: ID } | { ids: ID[] }): void;
  move(
    payload: ({ id: ID } | { ids: ID[] }) &
      (
        | { left: number; top: number; type: "window" }
        | { left: number; type: "titlebar" }
      )
  ): void;
  resize(
    payload: ({ id: ID } | { ids: ID[] }) & { height: number; width: number }
  ): void;
  show(payload: { id: ID } | { ids: ID[] }): void;
  zoom(payload: { id: ID } | { ids: ID[] }): void;
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
