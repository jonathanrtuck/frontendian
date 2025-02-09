import { ApplicationConfiguration } from "@/types";
import { TextEditor } from "./TextEditor";
import { TextEditorIcon } from "./TextEditorIcon";
import { getTitle } from "./utils";

export const APPLICATION_TEXT_EDITOR: ApplicationConfiguration = {
  Component: TextEditor,
  getTitle,
  Icon: TextEditorIcon,
  id: "application-text-editor",
};
