import { File } from "state/types";
import { MimeType } from "types";

// @todo determine this dynamically
const NUM_PAGES = 2;
// 11/8.5 ratio
const PAGE_HEIGHT = 990;
const PAGE_WIDTH = 765;

export const FILE_RESUME_PDF: File = {
  height: PAGE_HEIGHT * NUM_PAGES,
  id: "file-resume.pdf",
  title: "Résumé",
  type: MimeType.ApplicationPdf,
  url: `${process.env.PUBLIC_URL}/files/resume.pdf`,
  width: PAGE_WIDTH,
};
