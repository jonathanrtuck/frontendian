import { FunctionComponent, useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";

import { Menu } from "@/components/Menu";
import { Menuitem } from "@/components/Menuitem";
import { Graphics as Icon } from "@/icons";
import { ApplicationComponent, ApplicationComponentProps } from "@/types";

import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import "react-pdf/dist/esm/Page/TextLayer.css";

import styles from "./PdfViewer.module.css";

// @see https://github.com/wojtekmaj/react-pdf/tree/main?tab=readme-ov-file#import-worker-recommended
pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url
).toString();

/**
 * @see https://github.com/wojtekmaj/react-pdf
 * @todo handle loading/error
 */
const Component: FunctionComponent<ApplicationComponentProps> = ({
  file,
  openableFiles,
  useMenuitems,
}) => {
  const [numPages, setNumPages] = useState<number>(0);

  useMenuitems(
    [
      <>
        <Menuitem key="File" title="File">
          <Menu>
            <Menuitem
              onClick={() => {
                console.debug("new…");
              }}
              title="New"
            />
            <Menuitem title="Open">
              <Menu>
                {openableFiles.map(({ id, title }) => (
                  <Menuitem
                    key={id}
                    onClick={() => {
                      console.debug("open…", title);
                    }}
                    title={title}
                  />
                ))}
              </Menu>
            </Menuitem>
            <Menuitem separator />
            <Menuitem
              onClick={() => {
                console.debug("print…");
              }}
              title="Print"
            />
            <Menuitem separator />
            <Menuitem
              onClick={() => {
                console.debug("close…");
              }}
              title="Close"
            />
            <Menuitem
              onClick={() => {
                console.debug("quit…");
              }}
              title="Quit"
            />
          </Menu>
        </Menuitem>
        <Menuitem key="Help" title="Help">
          <Menu>
            <Menuitem
              onClick={() => {
                console.debug("about…");
              }}
              title={`About ${APPLICATION_PDF_VIEWER.title}…`}
            />
          </Menu>
        </Menuitem>
      </>,
    ],
    []
  ); // @todo

  if (file?.type !== "application/pdf") {
    return null;
  }

  return (
    <Document
      className={styles.root}
      file={file.url}
      onLoadSuccess={({ numPages }) => {
        setNumPages(numPages);
      }}>
      {Array.from(new Array(numPages)).map((_, i) => (
        <Page className={styles.page} key={i} pageIndex={i} scale={1.5} />
      ))}
    </Document>
  );
};

Component.displayName = "PdfViewer";

export const APPLICATION_PDF_VIEWER: ApplicationComponent = {
  Component,
  getWindow: (file) => ({
    height: 480,
    title: file?.title || "PDF Viewer",
    width: file && "width" in file ? file.width : undefined,
  }),
  Icon,
  id: "application-pdf-viewer",
  title: "PDF Viewer",
};
