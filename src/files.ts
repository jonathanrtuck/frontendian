import type { File } from "@/types";

export const FILE_README_MD: File = {
  getTitle: () => "About this site",
  getUrl: (theme) => `/files/README.${theme.id}.md`,
  id: "file-README.md",
  type: "text/markdown",
};

export const FILE_RESUME_PDF: File = {
  getTitle: () => "Résumé",
  getUrl: () => "/files/resume.pdf",
  id: "file-resume.pdf",
  type: "application/pdf",
  width: 765,
};
