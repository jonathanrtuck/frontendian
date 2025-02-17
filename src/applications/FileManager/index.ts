import type { Application, Theme } from "@/types";
import { FileManager } from "./FileManager";
import { FileManagerIcon } from "./FileManagerIcon";

export const APPLICATION_FILE_MANAGER: Application = {
  Component: FileManager,
  Icon: (theme: Theme) => FileManagerIcon, // @todo
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
