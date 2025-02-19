import type { ComponentType, SVGProps } from "react";
import { EmptyObject } from "type-fest";

export type Actions = Readonly<{
  blurWindow(payload: PayloadWithID): void;
  closeApplication(payload: PayloadWithID): void;
  closeDialog(payload: PayloadWithID): void;
  closeWindow(payload: PayloadWithID): void;
  collapseWindow(payload: PayloadWithID): void;
  expandWindow(payload: PayloadWithID): void;
  focusSystemBar(): void;
  focusWindow(payload: PayloadWithID): void;
  hideWindow(payload: PayloadWithID): void;
  moveTitlebar(payload: PayloadWithID<{ left: number }>): void;
  moveWindow(payload: PayloadWithID<Coordinates>): void;
  openApplication(payload: PayloadWithID): void;
  openDialog(payload: Omit<Dialog, "id">): void;
  openFile(payload: PayloadWithID<{ windowId?: ID }>): void;
  openWindow(payload: PayloadWithID<{ Component?: ComponentType }>): void;
  resizeWindow(payload: PayloadWithID<Size>): void;
  showWindow(payload: PayloadWithID): void;
  zoomWindow(payload: PayloadWithID): void;
}>;

export type Application = Readonly<{
  Component: ComponentType<{
    fileId?: File["id"];
    windowId: Window["id"];
  }>;
  getWindow?(
    fileId?: File["id"]
  ): Partial<
    Pick<
      Window,
      | "collapsed"
      | "height"
      | "hidden"
      | "resizable"
      | "title"
      | "width"
      | "zoomed"
    >
  >;
  Icon: (theme: Theme) => IconComponent;
  id: ID;
  mimetypes: MimeType[];
  title: (theme: Theme) => string;
}>;

export type Coordinates = {
  x: Pixels;
  y: Pixels;
};

export type Dialog = {
  Component: ComponentType;
  id: ID;
};

export type File = Readonly<
  {
    id: ID;
    title: string;
    url: (theme: Theme) => string;
  } & (
    | {
        mimetype: "application/pdf";
        width: Pixels; // page width
      }
    | {
        mimetype: "text/markdown";
      }
  )
>;

export type IconComponent = ComponentType<SVGProps<SVGSVGElement>>;

export type ID = string;

// add others as needed
export type MimeType = "application/pdf" | "text/markdown";

export type MS = number;

export type PayloadWithID<
  T extends {
    [x: string]: unknown;
    id?: ID;
  } = EmptyObject
> = { id: ID } & T;

export type Percentage = number;

export type Pixels = number;

export type Size = {
  height: Pixels;
  width: Pixels;
};

export type State = {
  dialogs: Dialog[];
  openApplicationIds: Application["id"][];
  stackingOrder: (Application["id"] | ID)[];
  windows: Window[];
};

export type Theme = "beos" | "mac-os-classic";

export type URL = string;

export type Window = Coordinates &
  Size & {
    applicationId: Application["id"];
    collapsed: boolean;
    focused: boolean;
    hidden: boolean;
    id: ID;
    prev?: Coordinates & Size;
    resizable: boolean;
    title: string;
    titlebar: {
      left: number; // percentage (0–1)
    };
    zoomed: boolean;
  } & (
    | {
        Component: ComponentType;
      }
    | {
        fileId?: File["id"];
      }
  );
