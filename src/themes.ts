import { Theme } from "@/types";

export const THEME_BEOS: Theme = {
  deskbar: {
    hidden: false,
  },
  id: "theme-beos",
  menubar: {
    windowed: true,
  },
  title: "BeOS",
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
  deskbar: {
    hidden: true,
  },
  id: "theme-mac-os-classic",
  menubar: {
    windowed: false,
  },
  title: "Mac OS Classic",
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
