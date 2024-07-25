import { FunctionComponent, useEffect, useState } from "react";

import { Graphics as Icon } from "@/icons";
import { ApplicationComponent, ApplicationComponentProps } from "@/types";

import styles from "./PdfViewer.module.css";

/**
 * it is impossible to detect focus within a different browsing context (e.g.
 * iframe), so `Window` component incorrectly fires a "BLUR" event when focus
 * moves into this iframe. 🤷‍♂️😣
 */
const Component: FunctionComponent<ApplicationComponentProps> = ({
  file,
  useMenuitems,
}) => {
  const [numPages, setNumPages] = useState<number>(1);

  useMenuitems([], []); // @todo

  // parse pdf to get number of pages
  useEffect(() => {
    if (file?.url) {
      const controller = new AbortController();

      fetch(file.url, {
        signal: controller.signal,
      })
        .then((response) => response.text())
        .then((text) => text.match(/\/Pages (\d+)/)?.[1])
        .then((numPagesStr) => {
          if (numPagesStr) {
            const numPages = Number(numPagesStr);

            if (!isNaN(numPages)) {
              setNumPages(numPages);
            }
          }
        })
        .catch(() => {});

      return () => {
        controller.abort("unmount");
      };
    }
  }, [file?.url]);

  if (file?.type !== "application/pdf") {
    return null;
  }

  return (
    <iframe
      className={styles.root}
      height={file.height * numPages}
      src={`${file.url}#toolbar=0&navpanes=0`} // hide chrome's chrome
      title={file.title}
      width={file.width}
    />
  );
};

Component.displayName = "PdfViewer";

export const APPLICATION_PDF_VIEWER: ApplicationComponent = {
  Component,
  getWindow: (file) => ({
    height: 600,
    title: file?.title || "PDF Viewer",
    width: file && "width" in file ? file.width : undefined,
  }),
  Icon,
  id: "application-pdf-viewer",
  title: "PDF Viewer",
};
