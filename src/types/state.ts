import {
  ForwardRefExoticComponent,
  HTMLAttributes,
  ReactElement,
  RefAttributes,
} from "react";

import { ID, MimeType, URL } from "./common";

export type Application = {
  Component: ForwardRefExoticComponent<ApplicationComponentProps>;
  getWindow?(file?: File): Partial<Window>;
  id: ID;
  title: string;
  windowIds: ID[];
};

export type ApplicationComponentProps = {
  application: Application;
  file?: File;
  window: Window;
} & HTMLAttributes<HTMLElement> &
  RefAttributes<ApplicationComponentRef>;

export type ApplicationComponentRef = {
  focus?(): void;
};

export type File = {
  id: ID;
  title: string;
  url: URL;
} & (
  | {
      height: number;
      type: MimeType.ApplicationPdf;
      width: number;
    }
  | {
      type: MimeType.TextMarkdown;
    }
);

export type State = {
  applications: Application[]; // the order is used as the display order in the Deskbar logo Menu
  desktop: ID[]; // the order is used as the display order on the Desktop
  files: File[];
  openApplicationIds: ID[]; // the order is used as the display order in the Deskbar Applications
  stackingOrder: ID[];
  types: Types;
  windows: Window[];
};

export type Types = Record<
  ID | MimeType,
  {
    application?: ID;
    icon: ReactElement;
  }
>;

export type Window = {
  fileId?: ID;
  focused: boolean;
  headerX: number;
  height: number;
  hidden: boolean;
  id: ID;
  title: string;
  width: number;
  x: number;
  y: number;
  zoomed: boolean;
};
