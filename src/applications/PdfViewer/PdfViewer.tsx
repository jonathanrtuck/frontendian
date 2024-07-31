import { useRef, useState } from "react";
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
  onAbout,
  onClose,
  onNew,
  onOpen,
  onQuit,
  openableFiles,
}) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const [numPages, setNumPages] = useState<number>(0);

  return (
    <>
      <Menubar>
        <Menuitem title="File">
          <Menu>
            <Menuitem onClick={onNew} title="New" />
            <Menuitem title="Open">
              <Menu>
                {openableFiles.map(({ id, title }) => (
                  <Menuitem
                    key={id}
                    onClick={() => {
                      onOpen(id);
                    }}
                    title={title}
                  />
                ))}
              </Menu>
            </Menuitem>
            <Menuitem separator />
            <Menuitem
              disabled={!file?.url}
              onClick={
                file?.url
                  ? () => {
                      iframeRef.current?.contentWindow?.print();
                    }
                  : undefined
              }
              title="Print"
            />
            <Menuitem separator />
            <Menuitem onClick={onClose} title="Close" />
            <Menuitem onClick={onQuit} title="Quit" />
          </Menu>
        </Menuitem>
        <Menuitem title="Help">
          <Menu>
            <Menuitem onClick={onAbout} title="About PDF Viewer…" />
          </Menu>
        </Menuitem>
      </Menubar>
      <Content>
        {file?.url ? (
          <>
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
            <iframe
              className={styles.iframe}
              ref={iframeRef}
              src={file.url}
              title={file.title}
            />
          </>
        ) : null}
      </Content>
    </>
  );
};
