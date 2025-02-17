import { FileManager } from "./FileManager";
import { BeOS, MacOSClassic } from "./icons";
import type { Application, Theme } from "@/types";

export const APPLICATION_FILE_MANAGER: Application = {
  Component: FileManager,
  Icon: (theme: Theme) => {
    switch (theme) {
      case "beos":
        return BeOS;
      case "mac-os-classic":
        return MacOSClassic;
    }
  },
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
