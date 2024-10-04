import {
  ComponentType,
  ForwardRefExoticComponent,
  PropsWithChildren,
  ReactNode,
  RefAttributes,
  RefObject,
  SVGAttributes,
} from "react";

import { MenuProps, MenuitemProps } from "@/components";

export type Application = ApplicationConfiguration & {
  windowIds: ID[];
};

export type ApplicationComponent = ComponentType<ApplicationComponentProps>;

export type ApplicationComponentProps = {
  Content: ComponentType<PropsWithChildren>;
  Menu: ComponentType<MenuProps>;
  Menubar: ComponentType<PropsWithChildren>;
  Menuitem: ComponentType<MenuitemProps>;
  file?: File;
  onAbout(node: ReactNode): void;
  onClose(): void;
  onNew(): void;
  onOpen(fileId: ID): void;
  onQuit(): void;
  onResize(height: number, width: number): void;
  openableFiles: File[];
};

export type ApplicationConfiguration = {
  Component: ApplicationComponent;
  getWindow?(file?: File): Partial<Window>;
  Icon?: IconComponent;
  id: ID;
  title: string;
};

export type File = {
  id: ID;
  title: string;
  url: URL;
} & (
  | {
      type: MimeType.ApplicationPdf;
      width: number; // page width
    }
  | {
      type: MimeType.TextMarkdown;
    }
);

export type Font = {
  format: "opentype"; // add others as needed
  id: ID;
  title: string;
  url: URL;
};

export type IconComponent = ForwardRefExoticComponent<
  SVGAttributes<SVGSVGElement> & RefAttributes<SVGSVGElement>
>;

export type ID = string;

export type Menuitem = {
  disabled: boolean;
  expandable: boolean;
  id: ID;
  ref: RefObject<HTMLElement>;
};

// add others as needed
export const enum MimeType {
  ApplicationPdf = "application/pdf",
  TextMarkdown = "text/markdown",
}

export type State = {
  applications: Application[]; // the order is used as the display order in the Deskbar MainMenu
  desktop: ID[]; // the order is used as the display order on the Desktop
  files: File[];
  fonts: Font[];
  openApplicationIds: ID[]; // the order is used as the display order in the Deskbar Applications Menu
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
  deskbar: {
    hidden: boolean;
  };
  id: ID;
  menubar: {
    windowed: boolean;
  };
  titlebar: {
    collapsible: boolean;
    doubleClick: boolean;
    draggable: boolean;
  };
  window: {
    hidable: boolean;
  };
};

export type URL = string;

export type Window = {
  active: boolean;
  fileId?: ID;
  focused: boolean;
  height: number;
  hidden: boolean;
  id: ID;
  left: number;
  scrollable: boolean;
  title: string;
  titlebarLeft: number;
  top: number;
  width: number;
  zoomed: boolean;
};
