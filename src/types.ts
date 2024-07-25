import {
  ComponentType,
  DependencyList,
  ForwardRefExoticComponent,
  ReactElement,
  RefAttributes,
  SVGAttributes,
} from "react";

import { MenuitemProps } from "@/components/Menuitem";

// all id(s) are window ids unless otherwise defined by the `type` property
export type Actions = {
  blurWindow(payload: ActionIds): void;
  closeApplication(payload: ActionIds): void;
  closeWindow(payload: ActionIds): void;
  focusWindow(payload: ActionIds): void;
  hideWindow(payload: ActionIds): void;
  moveWindow(payload: ActionIds & { left: number; top: number }): void;
  moveWindowTitlebar(payload: ActionIds & { left: number }): void;
  openApplication(payload: ActionIds): void;
  openFile(payload: ActionIds & { windowId?: ID }): void;
  openWindow(payload: ActionIds): void;
  resizeWindow(payload: ActionIds & { height: number; width: number }): void;
  showWindow(payload: ActionIds): void;
  zoomWindow(payload: ActionIds): void;
};

export type ActionIds = { id: ID } | { ids: ID[] };

export type Application = ApplicationComponent & {
  windowIds: ID[];
};

export type ApplicationComponent = {
  Component: ComponentType<ApplicationComponentProps>;
  Icon?: IconComponent;
  id: ID;
  title: string;
};

export type ApplicationComponentProps = {
  file?: File;
  useMenuitems(
    menuitems: ReactElement<MenuitemProps>[],
    deps: DependencyList
  ): void;
};

export type File = {
  id: ID;
  title: string;
  url: URL;
} & (
  | {
      height: number; // page height
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

export const enum MimeType {
  ApplicationPdf = "application/pdf",
  TextMarkdown = "text/markdown",
}

export type State = {
  applications: Application[]; // the order is used as the display order in the Deskbar logo Menu
  desktop: ID[]; // the order is used as the display order on the Desktop
  files: File[];
  fonts: Font[];
  openApplicationIds: ID[]; // the order is used as the display order in the Deskbar Applications
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
