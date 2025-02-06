import type { File } from "@/types";

export const FILE_README_MD: File = {
  id: "file-README.md",
  title: "About this site",
  type: "text/markdown",
  url: "/files/README.md", // @todo
};

export const FILE_RESUME_PDF: File = {
  id: "file-resume.pdf",
  title: "Résumé",
  type: "application/pdf",
  url: "/files/resume.pdf",
  width: 765,
};
