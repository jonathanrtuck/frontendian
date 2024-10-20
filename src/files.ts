import { File, MimeType } from "@/types";

export const FILE_README_MD: File = {
  id: "file-README.md",
  title: "About this site",
  type: MimeType.TextMarkdown,
  url: (theme) =>
    `${process.env.PUBLIC_URL}/themes/${theme.id.replace(
      /^theme-/,
      ""
    )}/README.md`,
};

export const FILE_RESUME_PDF: File = {
  id: "file-resume.pdf",
  title: "Résumé",
  type: MimeType.ApplicationPdf,
  url: `${process.env.PUBLIC_URL}/files/resume.pdf`,
  width: 765,
};
