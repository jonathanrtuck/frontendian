import {
  ForwardRefExoticComponent,
  HTMLAttributes,
  ReactElement,
  RefAttributes,
} from "react";

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
      }
    | {
        applicationId: ID;
        type: "window";
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

export type Application = {
  Component: ForwardRefExoticComponent<ApplicationComponentProps>;
  getWindow?(file?: File): Partial<Window>;
  icon: ReactElement;
  id: ID;
  title: string;
  windowIds: ID[];
};

export type ApplicationComponentProps = {
  application: Application;
  file?: File;
  window: Window;
} & HTMLAttributes<HTMLElement> &
  RefAttributes<ApplicationComponentRef>;

export type ApplicationComponentRef = {
  focus?(): void;
};

export type File = {
  id: ID;
  title: string;
  url: URL;
} & (
  | {
      height: number;
      type: MimeType.ApplicationPdf;
      width: number;
    }
  | {
      type: MimeType.TextMarkdown;
    }
);

export type ID = string;

export enum MimeType {
  ApplicationPdf = "application/pdf",
  TextMarkdown = "text/markdown",
}

export type State = {
  applications: Application[]; // the order is used as the display order in the Deskbar logo Menu
  desktop: ID[]; // the order is used as the display order on the Desktop
  files: File[];
  openApplicationIds: ID[]; // the order is used as the display order in the Deskbar Applications
  stackingOrder: ID[];
  types: Types;
  windows: Window[];
};

export type Types = Partial<
  Record<
    MimeType,
    {
      application?: ID;
      icon: ReactElement;
    }
  >
>;

export type URL = string;

export type Window = {
  fileId?: ID;
  focused: boolean;
  headerX: number;
  height: number;
  hidden: boolean;
  id: ID;
  title: string;
  width: number;
  x: number;
  y: number;
  zoomed: boolean;
};
