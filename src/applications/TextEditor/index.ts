import type { Application, Theme } from "@/types";
import { TextEditor } from "./TextEditor";
import { TextEditorIcon } from "./TextEditorIcon";

export const APPLICATION_TEXT_EDITOR: Application = {
  Component: TextEditor,
  Icon: TextEditorIcon,
  id: "application-text-editor",
  mimetypes: ["text/markdown"],
  title: (theme: Theme) => {
    switch (theme) {
      case "beos":
        return "StyledEdit";
      case "mac-os-classic":
        return "SimpleText";
    }
  },
};
