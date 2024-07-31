import {
  ComponentType,
  ForwardRefExoticComponent,
  PropsWithChildren,
  RefAttributes,
  RefObject,
  SVGAttributes,
} from "react";

import { MenuProps } from "@/components/Menu";
import { MenuitemProps } from "@/components/Menuitem";

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
  onAbout(): void;
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
  format: "opentype"; // add other formats as needed
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

export type URL = string;

export type Window = {
  fileId?: ID;
  focused: boolean;
  height: number;
  hidden: boolean;
  id: ID;
  left: number;
  title: string;
  titlebarLeft: number;
  top: number;
  width: number;
  zoomed: boolean;
};
