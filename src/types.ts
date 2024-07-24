import {
  ComponentType,
  DependencyList,
  ForwardRefExoticComponent,
  ReactElement,
  RefAttributes,
  SVGAttributes,
} from "react";

import { MenuItemProps } from "components/MenuItem";

export type Actions = {
  blur(payload: { id: ID } | { ids: ID[] }): void;
  close(payload: { id: ID } | { ids: ID[] }): void;
  focus(payload: { id: ID } | { ids: ID[] }): void;
  hide(payload: { id: ID } | { ids: ID[] }): void;
  move(
    payload: ({ id: ID } | { ids: ID[] }) &
      (
        | { left: number; top: number; type: "window" }
        | { left: number; type: "titlebar" }
      )
  ): void;
  open(
    payload: ({ id: ID } | { ids: ID[] }) & { type: "application" | "file" }
  ): void;
  resize(
    payload: ({ id: ID } | { ids: ID[] }) & { height: number; width: number }
  ): void;
  show(payload: { id: ID } | { ids: ID[] }): void;
  zoom(payload: { id: ID } | { ids: ID[] }): void;
};

export type Application = {
  Component: ComponentType<ApplicationComponentProps>;
  Icon?: IconComponent;
  id: ID;
  title: string;
  windowIds: ID[];
};

export type ApplicationComponentProps = {
  useMenuItems(
    menuItems: ReactElement<MenuItemProps>[],
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
  focused: boolean;
  height: number;
  hidden: boolean;
  id: ID;
  left: number;
  title: string;
  titleBarLeft: number;
  top: number;
  width: number;
  zoomed: boolean;
};
