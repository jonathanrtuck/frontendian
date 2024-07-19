export type Action =
  | ActionBlur
  | ActionClose
  | ActionFocus
  | ActionHide
  | ActionMove
  | ActionResize
  | ActionShow
  | ActionZoom;

export type ActionBlur = {
  payload: {
    ids: ID[];
  };
  type: "BLUR";
};

export type ActionClose = {
  payload: {
    ids: ID[];
    type: "application" | "window";
  };
  type: "CLOSE";
};

export type ActionFocus = {
  payload: {
    ids: ID[];
  };
  type: "FOCUS";
};

export type ActionHide = {
  payload: {
    ids: ID[];
  };
  type: "HIDE";
};

export type ActionMove = {
  payload:
    | {
        ids: ID[];
        left: number;
        type: "titleBar";
      }
    | {
        ids: ID[];
        left: number;
        top: number;
        type: "window";
      };
  type: "MOVE";
};

export type ActionResize = {
  payload: {
    height: number;
    ids: ID[];
    width: number;
  };
  type: "RESIZE";
};

export type ActionShow = {
  payload: {
    ids: ID[];
  };
  type: "SHOW";
};

export type ActionZoom = {
  payload: {
    ids: ID[];
  };
  type: "ZOOM";
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
