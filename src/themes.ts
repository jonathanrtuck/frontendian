import { Theme } from "@/types";

export const THEME_BEOS: Theme = {
  controlStrip: {
    hidden: true,
  },
  deskbar: {
    hidden: false,
  },
  id: "theme-beos",
  menubar: {
    windowed: true,
  },
  titlebar: {
    doubleClick: true,
    draggable: true,
    icon: false,
  },
  window: {
    collapsible: false,
    hidable: true,
  },
};

export const THEME_MAC_OS_CLASSIC: Theme = {
  controlStrip: {
    hidden: false,
  },
  deskbar: {
    hidden: true,
  },
  id: "theme-mac-os-classic",
  menubar: {
    windowed: false,
  },
  titlebar: {
    doubleClick: false,
    draggable: false,
    icon: true,
  },
  window: {
    collapsible: true,
    hidable: false,
  },
};
