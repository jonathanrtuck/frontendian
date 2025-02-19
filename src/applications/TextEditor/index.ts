import { TextEditor } from "./TextEditor";
import { TextEditorIcon } from "./TextEditorIcon";
import { title } from "./utils";
import type { Application } from "@/types";

export const APPLICATION_TEXT_EDITOR: Application = {
  Component: TextEditor,
  Icon: TextEditorIcon,
  id: "application-text-editor",
  mimetypes: ["text/markdown"],
  title,
};
