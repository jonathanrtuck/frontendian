import {
  ComponentProps,
  ComponentType,
  ForwardRefExoticComponent,
  PropsWithChildren,
  ReactNode,
  RefAttributes,
  SVGAttributes,
} from "react";

import { Menu, Menuitem } from "@/components";

export type Application = ApplicationConfiguration & {
  windowIds: ID[];
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

export type ApplicationConfiguration = {
  Component: ApplicationComponent;
  getWindow?(file?: File): Partial<Window>;
  Icon?: IconComponent;
  id: ID;
  title: string | ((theme: Theme) => string);
};

export type ComponentName =
  | "Applications"
  | "Button"
  | "Clock"
  | "Desktop"
  | "Dialog"
  | "ErrorBoundary"
  | "Icon"
  | "MainMenu"
  | "Menu"
  | "Menuitem"
  | "SystemBar"
  | "Tray"
  | "UI"
  | "Window"
  | "WindowContent"
  | "WindowMenu"
  | "WindowTitlebar";

export type CssModule = {
  readonly [key: string]: string;
};

export type File = {
  id: ID;
  title: string;
  url: URL | ((theme: Theme) => URL);
} & (
  | {
      type: MimeType.ApplicationPdf;
      width: Pixels; // page width
    }
  | {
      type: MimeType.TextMarkdown;
    }
);

export type Font = {
  // @see https://developer.mozilla.org/en-US/docs/Web/CSS/@font-face/src#font_formats
  format:
    | "collection"
    | "embedded-opentype"
    | "opentype"
    | "svg"
    | "truetype"
    | "woff"
    | "woff2";
  id: ID;
  title: string;
  url: URL;
};

export type IconComponent = ForwardRefExoticComponent<
  {
    theme?: Theme;
  } & SVGAttributes<SVGSVGElement> &
    RefAttributes<SVGSVGElement>
>;

export type ID = string;

// add others as needed
export const enum MimeType {
  ApplicationPdf = "application/pdf",
  TextMarkdown = "text/markdown",
}

export type MS = number;

export type Percentage = number;

export type Pixels = number;

export type State = {
  applications: Application[]; // the order is used as the display order in the SystemBar MainMenu
  desktop: ID[]; // the order is used as the display order on the Desktop
  files: File[];
  fonts: Font[];
  openApplicationIds: ID[]; // the order is used as the display order in the SystemBar Applications Menu
  stackingOrder: ID[];
  theme: Theme;
  types: Partial<
    Record<
      MimeType,
      {
        application?: ID;
        Icon: IconComponent;
      }
    >
  >;
  windows: Window[];
};

export type Theme = {
  id: "theme-beos" | "theme-mac-os-classic";
  menu: {
    Icon: IconComponent;
    title: string;
  };
  title: string;
};

export type URL = string;

export interface Window {
  collapsed: boolean;
  fileId?: ID;
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
