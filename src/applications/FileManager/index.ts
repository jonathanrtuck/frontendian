import { THEME_BEOS, THEME_MAC_OS_CLASSIC } from "@/themes";
import type { Application } from "@/types";
import { FileManager } from "./FileManager";
import { FileManagerIcon } from "./FileManagerIcon";

export const APPLICATION_FILE_MANAGER: Application = {
  Component: FileManager,
  getTitle: ({ themeId }) =>
    ({
      [THEME_BEOS.id]: "Tracker",
      [THEME_MAC_OS_CLASSIC.id]: "Finder",
    }[themeId]),
  Icon: FileManagerIcon,
  id: "application-file-manager",
};
