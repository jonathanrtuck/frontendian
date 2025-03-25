import type { Application } from "@/types";
import { AboutTextEditor } from "./AboutTextEditor";
import { TextEditor } from "./TextEditor";
import { ReactComponent as TextEditorBeOS } from "./text-editor-beos.svg";
import { ReactComponent as TextEditorMacOSClassic } from "./text-editor-mac-os-classic.svg";

export const APPLICATION_TEXT_EDITOR: Application = {
  About: AboutTextEditor,
  Component: TextEditor,
  Icon: (theme) => {
    switch (theme) {
      case "beos":
        return TextEditorBeOS;
      case "mac-os-classic":
        return TextEditorMacOSClassic;
    }
  },
  id: "application-text-editor",
  mimetypes: ["text/markdown"],
  title: (theme) => {
    switch (theme) {
      case "beos":
        return "StyledEdit";
      case "mac-os-classic":
        return "SimpleText";
    }
  },
};
