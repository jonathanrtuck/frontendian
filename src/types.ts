import type { ComplexStyleRule } from "@vanilla-extract/css";
import type { ComponentType, SVGAttributes } from "react";

export type Application = ApplicationConfiguration & {
  windowIds: Window["id"][];
};

export type ApplicationComponent = ComponentType<ApplicationComponentProps>;

export type ApplicationComponentProps = {
  // @todo
  file?: File;
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
    id: ID;
    title: string;
    url: URL;
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

export type Font = Readonly<{
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
}>;

export type IconComponent = ComponentType<SVGAttributes<SVGSVGElement>>;

export type ID = string;

// add others as needed
export type MimeType = "application/pdf" | "text/markdown";

export type MS = number;

export type Percentage = number;

export type Pixels = number;

export type State = {
  applications: Application[]; // the order is used as the display order in the SystemBar MainMenu
  currentThemeId: Theme["id"];
  desktop: (Application["id"] | File["id"])[]; // the order is used as the display order on the Desktop
  files: File[];
  fonts: Font[];
  openApplicationIds: Application["id"][]; // the order is used as the display order in the SystemBar Applications Menu
  stackingOrder: Application["id"][];
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

export type StylesByTheme = {
  [id in Theme["id"]]: ComplexStyleRule;
};
export type Theme = Readonly<{
  Icon: IconComponent;
  id: "theme-beos" | "theme-mac-os-classic";
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
