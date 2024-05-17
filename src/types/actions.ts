import { ID } from "./common";

export type Action =
  | ActionBlur
  | ActionClose
  | ActionFocus
  | ActionHide
  | ActionMove
  | ActionOpen
  | ActionResize
  | ActionShow
  | ActionTitle
  | ActionUnzoom
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
        type: "header";
        x: number;
      }
    | {
        ids: ID[];
        type: "window";
        x: number;
        y: number;
      };
  type: "MOVE";
};

export type ActionOpen = {
  payload:
    | {
        ids: ID[];
        type: "application";
      }
    | {
        ids: ID[];
        type: "file";
        windowId?: ID;
      };
  type: "OPEN";
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

export type ActionTitle = {
  payload: {
    ids: ID[];
    value: string | undefined;
  };
  type: "TITLE";
};

export type ActionUnzoom = {
  payload: {
    ids: ID[];
  };
  type: "UNZOOM";
};

export type ActionZoom = {
  payload: {
    ids: ID[];
  };
  type: "ZOOM";
};
