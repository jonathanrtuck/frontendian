export type ID = string;

export const enum MimeType {
  ApplicationPdf = "application/pdf",
  TextMarkdown = "text/markdown",
}

export type URL = string;

export type Window = {
  height: number;
  id: ID;
  left: number;
  title: string;
  top: number;
  width: number;
  zoomed: boolean;
};
