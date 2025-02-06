import { THEME_BEOS, THEME_MAC_OS_CLASSIC } from "@/themes";
import type { ApplicationConfiguration } from "@/types";

import { FileManager } from "./FileManager";
import { FileManagerIcon } from "./FileManagerIcon";

export const APPLICATION_FILE_MANAGER: ApplicationConfiguration = {
  Component: FileManager,
  getTitle: (theme) => {
    switch (theme.id) {
      case THEME_BEOS.id:
        return "Tracker";
      case THEME_MAC_OS_CLASSIC.id:
        return "Finder";
      default:
        return "File Manager";
    }
  },
  Icon: FileManagerIcon,
  id: "application-file-manager",
};
