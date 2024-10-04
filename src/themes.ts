import { Theme } from "@/types";

export const THEME_BEOS: Theme = {
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
  },
  window: {
    hidable: true,
  },
};

export const THEME_MAC_OS_CLASSIC: Theme = {
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
  },
  window: {
    hidable: false,
  },
};
