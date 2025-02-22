import type { ComponentType, SVGProps } from "react";
import type { EmptyObject, SimplifyDeep } from "type-fest";

export type Actions = Readonly<{
  blurWindow(payload: PayloadWithID): void;
  closeApplication(payload: PayloadWithID): void;
  closeDialog(payload: PayloadWithID): void;
  closeWindow(payload: PayloadWithID): void;
  collapseMenuitem(payload: PayloadWithID): void;
  collapseWindow(payload: PayloadWithID): void;
  expandMenuitem(payload: PayloadWithID): void;
  expandWindow(payload: PayloadWithID): void;
  focusSystemBar(): void;
  focusWindow(payload: PayloadWithID): void;
  hideWindow(payload: PayloadWithID): void;
  maximizeWindow(payload: PayloadWithID): void;
  moveTitlebar(payload: PayloadWithID<{ left: Percentage }>): void;
  moveWindow(payload: PayloadWithID<Coordinates>): void;
  openApplication(payload: PayloadWithID): void;
  openDialog(payload: Omit<Dialog, "id">): void;
  openFile(payload: PayloadWithID<{ windowId?: Window["id"] }>): void;
  openWindow(
    payload: PayloadWithID<{
      Component?: ComponentType;
      title?: Window["title"];
    }>
  ): void;
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
      "collapsed" | "height" | "hidden" | "resizable" | "title" | "width"
    >
  >;
  Icon: IconComponent;
  id: ID;
  mimetypes: MimeType[];
  title(theme: Theme): string;
}>;

export type Coordinates = {
  x: Pixels;
  y: Pixels;
};

export type Dialog = {
  Component: ComponentType;
  id: ID;
  title: string;
  windowId?: Window["id"];
};

export type File = Readonly<{
  id: ID;
  mimetype: MimeType;
  title: string;
  url(theme: Theme): string;
}>;

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
  height: Pixels | "auto";
  width: Pixels | "auto";
};

export type State = {
  dialogs: Dialog[];
  expandedMenuitemIds: ID[];
  openApplicationIds: Application["id"][];
  stackingOrder: (Application["id"] | ID)[];
  windows: Window[];
};

export type Theme = "beos" | "mac-os-classic";

export type URL = string;

export type Window = SimplifyDeep<
  Coordinates &
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
        left: Percentage;
      };
    }
> &
  (
    | {
        Component: ComponentType;
      }
    | {
        fileId?: File["id"];
      }
  );
