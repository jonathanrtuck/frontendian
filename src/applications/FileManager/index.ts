import { FileManager } from "./FileManager";
import { FileManagerIcon } from "./FileManagerIcon";
import { type Application } from "@/types";
import { Fragment } from "react";

export const APPLICATION_FILE_MANAGER: Application = {
  About: Fragment,
  Component: FileManager,
  Icon: FileManagerIcon,
  id: "application-file-manager",
  mimetypes: [],
  title: (theme) => {
    switch (theme) {
      case "beos":
        return "Tracker";
      case "mac-os-classic":
        return "Finder";
      case "windows-95":
        return "Windows Explorer";
    }
  },
};
