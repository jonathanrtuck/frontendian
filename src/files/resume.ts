import { File } from "state/types";
import { MimeType } from "types";

export const FILE_RESUME: File = {
  height: 990 * 2, // numPages
  id: "file-resume",
  title: "Résumé",
  type: MimeType.ApplicationPdf,
  url: `${process.env.PUBLIC_URL}/files/resume.pdf`,
  width: 765, // 11/8.5 ratio
};
