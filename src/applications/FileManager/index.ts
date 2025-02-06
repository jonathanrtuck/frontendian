import type { ApplicationConfiguration } from "@/types";

import { FileManager } from "./FileManager";
import { FileManagerIcon } from "./FileManagerIcon";

export const APPLICATION_FILE_MANAGER: ApplicationConfiguration = {
  Component: FileManager,
  Icon: FileManagerIcon,
  id: "application-file-manager",
  title: (theme) => {
    switch (theme.id) {
      case "theme-beos":
        return "Tracker";
      case "theme-mac":
        return "Finder";
    }
  },
};
