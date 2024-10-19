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
      doubleClick: true,
      draggable: true,
      icon: false,
    },
    window: {
      collapsible: false,
      hidable: true,
    },
  },
  id: "theme-beos",
  title: "BeOS",
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
      doubleClick: false,
      draggable: false,
      icon: true,
    },
    window: {
      collapsible: true,
      hidable: false,
    },
  },
  id: "theme-mac-os-classic",
  title: "Mac OS Classic",
};
