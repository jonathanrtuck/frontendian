import { AboutTextEditor } from "./AboutTextEditor";
import { TextEditor } from "./TextEditor";
import { TextEditorIcon } from "./TextEditorIcon";
import { type Application } from "@/types";

export const APPLICATION_TEXT_EDITOR: Application = {
  About: AboutTextEditor,
  Component: TextEditor,
  Icon: TextEditorIcon,
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
