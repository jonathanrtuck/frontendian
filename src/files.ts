import type { File } from "@/types";

export const FILE_README_MD: File = {
  id: "file-README.md",
  mimetype: "text/markdown",
  title: "About this site",
  url: (theme) => `/files/README.${theme}.md`,
};

export const FILE_RESUME_PDF: File = {
  id: "file-resume.pdf",
  mimetype: "application/pdf",
  title: "Résumé",
  url: () => "/files/resume.pdf",
  width: 765,
};
