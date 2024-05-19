import { File } from "state/types";
import { MimeType } from "types";

export const FILE_ABOUT: File = {
  id: "file-about",
  title: "About frontendian",
  type: MimeType.TextMarkdown,
  url: "https://raw.githubusercontent.com/jonathanrtuck/frontendian/main/README.md",
};
