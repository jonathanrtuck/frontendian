import { Menu, Menuitem } from "@/components";
import type {
  ComponentProps,
  ComponentType,
  PropsWithChildren,
  ReactNode,
  RefObject,
  SVGAttributes,
} from "react";
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
  moveWindow(payload: PayloadWithID<{ left: Pixels; top: Pixels }>): void;
  moveWindowTitlebar(payload: PayloadWithID<{ left: Pixels }>): void;
  openApplication(payload: PayloadWithID): void;
  openFile(payload: PayloadWithID<{ windowId?: ID }>): void;
  openWindow(payload: PayloadWithID): void;
  resizeWindow(payload: PayloadWithID<{ height: Pixels; width: Pixels }>): void;
  setTheme(payload: PayloadWithID<{ id: Theme["id"] }>): void;
  showWindow(payload: PayloadWithID): void;
  zoomWindow(payload: PayloadWithID): void;
}>;

export type Application = Readonly<{
  Component: ApplicationComponent;
  getTitle(obj: { themeId: Theme["id"] }): string;
  getWindow?(obj: { file?: File; themeId: Theme["id"] }): Partial<Window>; // @todo just pass `fileId` instead
  Icon: IconComponent;
  id: ID;
}>;

export type ApplicationComponent = ComponentType<{
  Content: ComponentType<PropsWithChildren>;
  Menu: ComponentType<ComponentProps<typeof Menu>>;
  Menubar: ComponentType<PropsWithChildren>;
  Menuitem: ComponentType<ComponentProps<typeof Menuitem>>;
  file?: File;
  onAbout(node: ReactNode): void;
  onClose(): void;
  onNew(): void;
  onOpen(fileId: ID): void;
  onQuit(): void;
  onResize(height: Pixels, width: Pixels): void;
  openableFiles: File[];
}>;

export type File = Readonly<
  {
    getTitle(obj: { themeId: Theme["id"] }): string;
    getUrl(obj: { themeId: Theme["id"] }): URL;
    id: ID;
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

export type IconComponent = ComponentType<
  SVGAttributes<SVGSVGElement> & {
    ref?: RefObject<SVGSVGElement>;
  }
>;

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

export type State = {
  desktop: (Application["id"] | File["id"])[]; // the order is used as the display order on the Desktop
  openApplicationIds: Application["id"][]; // the order is used as the display order in the SystemBar Applications Menu
  stackingOrder: (Application["id"] | ID)[];
  themeId: Theme["id"];
  windows: Window[];
};

export type Theme = Readonly<{
  Icon: IconComponent;
  id: "theme-beos" | "theme-mac-os-classic";
  isDefault?: boolean;
  title: string;
}>;

export type URL = string;

export interface Window {
  applicationId: Application["id"];
  collapsed: boolean;
  fileId?: File["id"];
  focused: boolean;
  height: Pixels;
  hidden: boolean;
  id: ID;
  left: Pixels;
  prev?: Pick<this, "height" | "left" | "top" | "width">;
  resizable: boolean;
  scrollable: boolean;
  title: string;
  titlebarLeft: Percentage;
  top: Pixels;
  width: Pixels;
  zoomed: boolean;
}
