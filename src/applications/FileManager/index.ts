import { THEME_BEOS, THEME_MAC_OS_CLASSIC } from "@/themes";
import type { ApplicationConfiguration } from "@/types";
import { FileManager } from "./FileManager";
import { FileManagerIcon } from "./FileManagerIcon";

export const APPLICATION_FILE_MANAGER: ApplicationConfiguration = {
  Component: FileManager,
  getTitle: (theme) =>
    ({
      [THEME_BEOS.id]: "Tracker",
      [THEME_MAC_OS_CLASSIC.id]: "Finder",
    }[theme.id]),
  Icon: FileManagerIcon,
  id: "application-file-manager",
};
