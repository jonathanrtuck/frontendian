import { Theme } from "@/types";

export const THEME_BEOS: Theme = {
  borderColor: "rgb(160, 160, 160)",
  borderWidth: "0.0625rem",
  deskbar: {
    hidden: false,
  },
  id: "theme-beos",
  menubar: {
    windowed: true,
  },
  titlebar: {
    collapsible: false,
    doubleClick: true,
    draggable: true,
    height: "1.25rem",
    padding: "0",
  },
  window: {
    backgroundColor: "rgb(232, 232, 232)",
    backgroundColorActive: "rgb(224, 224, 224)",
    hidable: true,
    padding: "0.125rem",
  },
};

export const THEME_MAC_OS_CLASSIC: Theme = {
  borderColor: "rgb(38, 38, 38)",
  borderWidth: "0.0625rem",
  deskbar: {
    hidden: true,
  },
  id: "theme-mac-os-classic",
  menubar: {
    windowed: false,
  },
  titlebar: {
    collapsible: true,
    doubleClick: false,
    draggable: false,
    height: "1.25rem",
    padding: "0.25rem",
  },
  window: {
    backgroundColor: "rgb(204, 204, 204)",
    backgroundColorActive: "rgb(204, 204, 204)",
    hidable: false,
    padding: "0.25rem",
  },
};
