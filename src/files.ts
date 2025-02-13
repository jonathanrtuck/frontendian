import type { File } from "@/types";

export const FILE_README_MD: File = {
  getTitle: () => "About this site",
  getUrl: ({ themeId }) => `/files/README.${themeId}.md`,
  id: "file-README.md",
  mimetype: "text/markdown",
};

export const FILE_RESUME_PDF: File = {
  getTitle: () => "Résumé",
  getUrl: () => "/files/resume.pdf",
  id: "file-resume.pdf",
  mimetype: "application/pdf",
  width: 765,
};
