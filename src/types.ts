import { Menu, Menuitem } from "@/components";
import type {
  ComponentProps,
  ComponentType,
  PropsWithChildren,
  ReactNode,
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

export type Application = ApplicationConfiguration & {
  windowIds: Window["id"][];
};

export type ApplicationComponent = ComponentType<ApplicationComponentProps>;

export type ApplicationComponentProps = {
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
  theme: Theme;
};

export type ApplicationConfiguration = Readonly<{
  Component: ApplicationComponent;
  getTitle(theme: Theme): string;
  getWindow?(file?: File): Partial<Window>;
  Icon?: IconComponent;
  id: ID;
}>;

export type File = Readonly<
  {
    getTitle(theme: Theme): string;
    getUrl(theme: Theme): URL;
    id: ID;
  } & (
    | {
        type: "application/pdf";
        width: Pixels; // page width
      }
    | {
        type: "text/markdown";
      }
  )
>;

export type IconComponent = ComponentType<
  SVGAttributes<SVGSVGElement> & {
    theme?: Theme;
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
  applications: Application[]; // the order is used as the display order in the SystemBar MainMenu
  currentThemeId: Theme["id"];
  desktop: (Application["id"] | File["id"])[]; // the order is used as the display order on the Desktop
  files: File[];
  openApplicationIds: Application["id"][]; // the order is used as the display order in the SystemBar Applications Menu
  stackingOrder: Application["id"][];
  systemBarId: ID;
  themes: Theme[];
  types: Partial<
    Record<
      MimeType,
      {
        application?: Application["id"];
        Icon: IconComponent;
      }
    >
  >;
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
