import { Theme } from "@/types";

export const THEME_BEOS: Theme = {
  components: {
    deskbar: {
      hidden: false,
    },
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
  },
  id: "theme-beos",
  url: `${process.env.PUBLIC_URL}/css/beos.css`,
};

export const THEME_MAC_OS_CLASSIC: Theme = {
  components: {
    deskbar: {
      hidden: true,
    },
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
  },
  id: "theme-mac-os-classic",
  url: `${process.env.PUBLIC_URL}/css/mac-os-classic.css`,
};
