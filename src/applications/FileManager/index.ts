import type { Application } from "@/types";
import { Fragment } from "react";
import { FileManager } from "./FileManager";
import { ReactComponent as FileManagerBeOS } from "./file-manager-beos.svg";
import { ReactComponent as FileManagerMacOSClassic } from "./file-manager-mac-os-classic.svg";

export const APPLICATION_FILE_MANAGER: Application = {
  About: Fragment,
  Component: FileManager,
  Icon: (theme) => {
    switch (theme) {
      case "beos":
        return FileManagerBeOS;
      case "mac-os-classic":
        return FileManagerMacOSClassic;
    }
  },
  id: "application-file-manager",
  mimetypes: [],
  title: (theme) => {
    switch (theme) {
      case "beos":
        return "Tracker";
      case "mac-os-classic":
        return "Finder";
    }
  },
};
