import { useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";

import { ApplicationComponent } from "@/types";

import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import "react-pdf/dist/esm/Page/TextLayer.css";

import styles from "./PdfViewer.module.css";

// @see https://github.com/wojtekmaj/react-pdf/tree/main?tab=readme-ov-file#import-worker-recommended
pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url
).toString();

// @see https://github.com/wojtekmaj/react-pdf
export const PdfViewer: ApplicationComponent = ({
  Content,
  Menu,
  Menubar,
  Menuitem,
  file,
  openableFiles,
}) => {
  const [numPages, setNumPages] = useState<number>(0);

  return (
    <>
      <Menubar>
        <Menuitem title="File">
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
        <Menuitem title="Help">
          <Menu>
            <Menuitem
              onClick={() => {
                console.debug("about…");
              }}
              title="About PDF Viewer…"
            />
          </Menu>
        </Menuitem>
      </Menubar>
      <Content>
        {file?.url ? (
          <Document
            className={styles.root}
            file={file.url}
            loading={null}
            onLoadSuccess={({ numPages }) => {
              setNumPages(numPages);
            }}>
            {Array.from(new Array(numPages)).map((_, i) => (
              <Page
                className={styles.page}
                key={i}
                pageIndex={i}
                scale={1.25}
              />
            ))}
          </Document>
        ) : null}
      </Content>
    </>
  );
};
