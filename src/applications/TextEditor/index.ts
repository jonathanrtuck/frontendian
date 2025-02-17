import { BeOS, MacOSClassic } from "./icons";
import { TextEditor } from "./TextEditor";
import { title } from "./utils";
import type { Application, Theme } from "@/types";

export const APPLICATION_TEXT_EDITOR: Application = {
  Component: TextEditor,
  Icon: (theme: Theme) => {
    switch (theme) {
      case "beos":
        return BeOS;
      case "mac-os-classic":
        return MacOSClassic;
    }
  },
  id: "application-text-editor",
  mimetypes: ["text/markdown"],
  title,
};
