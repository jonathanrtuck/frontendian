export type ID = string;

export const enum MimeType {
  ApplicationPdf = "application/pdf",
  TextMarkdown = "text/markdown",
}

export type URL = string;

export type Window = {
  focused: boolean;
  height: number;
  hidden: boolean;
  id: ID;
  left: number;
  title: string;
  titleBarLeft: number;
  top: number;
  width: number;
  zoomed: boolean;
};
