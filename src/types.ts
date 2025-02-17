import type { ComponentType, ReactNode, SVGProps } from "react";
import { EmptyObject } from "type-fest";

export type Actions = Readonly<{
  blurWindow(payload: PayloadWithID): void;
  closeApplication(payload: PayloadWithID): void;
  closeWindow(payload: PayloadWithID): void;
  collapseWindow(payload: PayloadWithID): void;
  expandWindow(payload: PayloadWithID): void;
  focusSystemBar(): void;
  focusWindow(payload: PayloadWithID): void;
  hideWindow(payload: PayloadWithID): void;
  moveWindow(payload: PayloadWithID<Coordinates>): void;
  moveWindowTitlebar(payload: PayloadWithID<Coordinates>): void;
  openApplication(payload: PayloadWithID): void;
  openFile(payload: PayloadWithID<{ windowId?: ID }>): void;
  openWindow(payload: PayloadWithID<{ content?: ReactNode }>): void; // ???
  resizeWindow(payload: PayloadWithID<Size>): void;
  showWindow(payload: PayloadWithID): void;
  zoomWindow(payload: PayloadWithID): void;
}>;

export type Application = Readonly<{
  Component: ApplicationComponent;
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
  Icon: IconComponent | ((theme: Theme) => IconComponent);
  id: ID;
  mimetypes: MimeType[];
  title: string | ((theme: Theme) => string);
}>;

// @todo
export type ApplicationComponent = ComponentType<{
  file?: File;
  /*
  Content: ComponentType<PropsWithChildren>;
  Menu: ComponentType<ComponentProps<typeof Menu>>;
  Menubar: ComponentType<PropsWithChildren>;
  Menuitem: ComponentType<ComponentProps<typeof Menuitem>>;
  onAbout(node: ReactNode): void;
  onClose(): void;
  onNew(): void;
  onOpen(fileId: ID): void;
  onQuit(): void;
  onResize(height: Pixels, width: Pixels): void; // @todo `Size`
  openableFiles: File[];
  */
}>;

export type Coordinates = {
  x: Pixels;
  y: Pixels;
};

export type File = Readonly<
  {
    id: ID;
    title: string;
    url: string | ((theme: Theme) => string);
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
  openApplicationIds: Application["id"][]; // the order is used as the display order in the SystemBar Applications Menu
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
    titlebar: Coordinates;
    zoomed: boolean;
  } & (
    | {
        content?: ReactNode;
      }
    | {
        fileId?: File["id"];
      }
  );
