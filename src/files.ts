import { type File } from "@/types";

export const FILE_README_MD: File = {
  id: "file-README.md",
  mimetype: "text/markdown",
  title: "About this site",
  url: (theme) => `/themes/${theme}/README.md`,
};

export const FILE_RECENT_PROJECTS_MD: File = {
  id: "file-recent-projects.md",
  mimetype: "text/markdown",
  title: "Recent Projects",
  url: () => "/files/recent-projects.md",
};

export const FILE_RESUME_PDF: File = {
  id: "file-resume.pdf",
  mimetype: "application/pdf",
  title: "Résumé",
  url: () => "/files/resume.pdf",
};
