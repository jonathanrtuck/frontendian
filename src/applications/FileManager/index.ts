import { FileManager } from "./FileManager";
import { FileManagerIcon } from "./FileManagerIcon";
import type { Application, Theme } from "@/types";

export const APPLICATION_FILE_MANAGER: Application = {
  Component: FileManager,
  Icon: FileManagerIcon,
  id: "application-file-manager",
  mimetypes: [],
  title: (theme: Theme) => {
    switch (theme) {
      case "beos":
        return "Tracker";
      case "mac-os-classic":
        return "Finder";
    }
  },
};
